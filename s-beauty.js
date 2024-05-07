const saturateRange = document.getElementById('saturateRange');
const brightnessRange = document.getElementById('brightnessRange');
const hairImage = document.querySelector('.hair img');
const titles = document.querySelector('.titles');
const number = document.querySelector('.number');
const maintitle = document.querySelector('.maintitle');
const latBtn = document.querySelector('.lat-btn');
const preBtn = document.querySelector('.pre-btn');
const idolContainer = document.querySelector('.idol');
const textInput = document.querySelector("input[type='text']"); // 수정된 부분: textInput 변수 설정
const phrase = document.querySelector('.phrase p'); // 수정된 부분: phrase 변수 설정

const hairBandImages = document.querySelectorAll('.hair-band img');
const animalHImages = document.querySelectorAll('.animal-h img');

hairBandImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        // 선택된 이미지에 'active' 클래스 추가
        image.classList.toggle('active');

        // 선택된 이미지에 해당하는 animal-h 이미지 표시
        animalHImages.forEach((animalImage, animalIndex) => {
            if (index === animalIndex) {
                animalImage.style.display = 'block';
            } else {
                animalImage.style.display = 'none';
            }
        });
    });
});


function adjustImage() {
    const saturateValue = saturateRange.value;
    const brightnessValue = brightnessRange.value;
    hairImage.style.filter = `brightness(${brightnessValue * 1.2}%) saturate(${saturateValue * 1.2}%)`;
}

// 슬라이더 값 변경 시 adjustImage 함수 호출
brightnessRange.addEventListener('input', adjustImage);
saturateRange.addEventListener('input', adjustImage);

// 다음 버튼 클릭 시
let currentStep = 1; // 현재 단계를 나타내는 변수

latBtn.addEventListener('click', function() {
    if (currentStep === 1) {
        // STEP 1에서의 동작
        number.textContent = 'STEP 2';
        maintitle.textContent = '원하는 해시태그를 써주세요!';
        // input 요소들의 type 변경
        saturateRange.remove();
        brightnessRange.remove();
        idolContainer.appendChild(textInput);
        latBtn.style.marginLeft = '24px';
        preBtn.style.display = 'inline-block';
        textInput.style.display = 'inline-block';
        currentStep = 2; // 다음 단계로 이동
    } else if (currentStep === 2) {
        // STEP 2에서의 동작
        number.textContent = 'STEP 3';
        maintitle.textContent = '원하는 이모지를 선택해주세요!';
        textInput.remove();
        textInput.style.display = 'none';

        document.querySelector('.hair-band').style.display = 'flex';
        document.querySelector('.hair-band').classList.add('active');

        preBtn.style.display = 'inline-block';
        textInput.style.display = 'inline-block';
        currentStep = 3; // 다음 단계로 이동
    } else if (currentStep === 3) {
        number.textContent = 'COMPLETE!';
        maintitle.textContent = '이미지가 완성되었습니다!';

        hairBandImages.forEach(image => {
            image.remove();
        });

        preBtn.textContent = '이미지 다운로드';
        latBtn.textContent = '다시하기';
        latBtn.style.width = '140px';
        latBtn.style.textAlign = 'center';
        currentStep = 4;
    } else if (currentStep === 4) {
        location.reload();
    }
});


// 헤어밴드 classlist
hairBandImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        // 선택된 이미지에 'active' 클래스 추가
        image.classList.toggle('active');

        // 선택된 이미지에 해당하는 animal-h 이미지 표시
        animalHImages.forEach((animalImage, animalIndex) => {
            if (index === animalIndex) {
                // active 클래스가 추가된 경우 천천히 나타나도록 함
                setTimeout(() => {
                    animalImage.classList.toggle('active');
                }, 100 * index); // index에 따라 나타나는 속도를 조절할 수 있음
            } else {
                animalImage.classList.remove('active');
            }
        });
    });
});


// 이전 버튼 클릭 시
preBtn.addEventListener('click', function() {
    if (currentStep === 2) {
        // STEP 2 -> STEP 1로 변경
        number.textContent = 'STEP 1';
        maintitle.textContent = '헤어 컬러를 골라주세요!';
        textInput.remove();
        titles.appendChild(saturateRange);
        titles.appendChild(brightnessRange);
        latBtn.style.display = 'inline-block';
        preBtn.style.display = 'none';
        latBtn.style.marginLeft = '0';
        currentStep = 1;
    } else if (currentStep === 3) {
        // STEP 3 -> STEP 2로 변경
        number.textContent = 'STEP 2';
        maintitle.textContent = '원하는 해시태그를 써주세요!';
        document.querySelector('.hair-band').style.display = 'none';
        document.querySelectorAll('.animal-h img').forEach(img => {
            img.style.display = 'none';
        });
        idolContainer.appendChild(textInput);
        saturateRange.remove();
        brightnessRange.remove();
        latBtn.style.display = 'inline-block';
        preBtn.style.display = 'none';
        latBtn.style.marginLeft = '0';
        // 현재 단계 변경
        currentStep = 2;
    }
    const loadingIcon = document.createElement('div');
loadingIcon.classList.add('loading-icon');
preBtn.appendChild(loadingIcon);

// 다운로드 애니메이션 추가 후 3초 후에 완료되었다는 메시지 표시
setTimeout(() => {
    loadingIcon.remove(); // 로딩 아이콘 제거
    alert('이미지가 다운로드되었습니다!');
}, 3000);
    
});

textInput.addEventListener('input', function() {
    const maxLength = 36; // 최대 글자 수
    let text = this.value;
    if (text.length > maxLength) {
        text = text.slice(0, maxLength); // 최대 글자 수까지 자름
    }
    this.value = text; // 최대 글자 수까지 자른 텍스트를 input에 설정
    phrase.innerHTML = text; // phrase에 입력된 텍스트 표시
});
