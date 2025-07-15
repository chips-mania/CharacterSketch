import React from 'react';
import { AIImage } from '../../types/ai-image';

interface CharacterInfoProps {
  image: AIImage;
}

interface CharacterDetail {
  quote: string;
  description: string;
  traits: string[];
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ image }) => {
  // AI 이미지별 캐릭터 상세 정보
  const characterDetails: Record<string, CharacterDetail> = {
    '1': {
      quote: '"너에게 어떤 신념이 있다면, 네가 직접 그걸 이루면 되는거야."',
      description: '공인 8급의 조작계 조너로 전투 마법사이다. 토르미아 왕립마법학교를 수석졸업한 수재이며 토르미아 왕국 마법협회 경비부서 3층의 관리장으로 동색 직원증을 갖고 있다. 현재 스물 두살이고 15권 8화 기준으로 2년전에 협회에 입사해 현재 자리까지 올라온 천재다. 키는 작고 푸른 갈래머리를 허리까지 길렀으며 피부가 하얗고 입술이 붉은 새치름한 인상의 예쁜 얼굴이다. 무법사의 마법사들 중에선 드물게 지팡이를 사용하며 여기에는 봉황 장식과 알이 박혀 있다. 강력기는 화염계 기술인 봉황정. 가올드 친위대의 일원이다. 후에는 루피스트의 비서실장이 된다.',
      traits: ['작은 키', '허리까지 긴 푸른 갈래머리', '하얀 피부', '붉은 입술', '새치름한 인상', '화려한 봉황 장식과 굵은 수정구가 박힌 스태프', '안경'
]
    },
    '2': {
      quote: '"삶은 고통."',
      description: '20인의 심판 당시, 성전 측 율법사들에게 공격을 받아 "자기상환적 돌연변이"라는 통각을 일반인의 1000배로 느끼는 희귀한 병을 얻게 되었다. 이로 인해 매 순간을 극심한 고통 속에서 살게 되었고, 방랑하던 중 남방의 멸족한 늑대부족 후예인 강난을 만나 동행하게 되었다. 사막 지역을 떠돌던 그는 통각의 한계를 넘어서 약 1년간 지옥에 빠지게 되었다. 이후 지옥에서 가까스로 빠져나왔으나, 그 결과 단기 기억 상실증에 걸려 하루에도 수십 번씩 기억이 사라지는 고통을 겪었다. 그러나 강난의 존재를 통해 삶의 의욕을 되찾은 그는 미로를 구출하기 위한 계획을 세우고, 마법 협회의 협회장이 되기 위해 백방으로 노력했다.',
      traits: ['넓은 가슴', '범처럼 가는 허리', '전신이 상처투성이', '강퍅한 얼굴','도드라진 광대뼈', '왼쪽 눈 세로 상흔', '턱수염에 가려진 상처투성이 하관'
]
    },
    '3': {
      quote: '"나는 늑대다. 날 사람으로 취급했다가는 널 죽일 거야."',
      description: '토르미아 마법협회의 비서실장으로 늑대일족의 마지막 후손이다. 열세살 무렵 부족이 멸망해 노예 상인들에게 팔려나갔다가 의도치 않게 가올드에게 구해진 뒤 2년 뒤 열다섯살의 나이로 가올드와 함께 토르미아 마법협회에 들어서게 된다. 늑대일족 전통 무술인 람무아이를 사용하며 가올드와 함께 미로를 구하는 태스크 포스 팀에 속하기도 했다. 천국에서 신적초월을 터득해 오브제 "자충"을 부수고 가올드에게 다가가는 것을 성공한다. 어렸을 적에는 가올드를 "아저씨"라고 부르며 따랐지만 머리가 커지고 나서는 가올드에게 있어 미로라는 존재가 얼마나 큰 지 깨닫고선 호칭도 바꾸어 거리를 두고 있다. 하지만 마음만은 여전히 자신을 구해준 그때의 가올드를 사랑하고 있다.',
      traits: ['가무잡잡한 피부', '고불고불한 금발을 뒤로 묶어 올림', '작지만 오똑한 코', '핑크빛 입술', '살짝 내려온 눈꼬리', '강인한 인상', '단정한 옷차림', '빨간색 뿔테안경'
]
    },
    '7': {
      quote: '"캐릭터의 대사가 준비 중입니다."',
      description: '캐릭터의 설명이 준비 중입니다.',
      traits: ['준비 중']
    },
    '8': {
      quote: '"캐릭터의 대사가 준비 중입니다."',
      description: '캐릭터의 설명이 준비 중입니다.',
      traits: ['준비 중']
    }
  };

  const currentCharacter = characterDetails[image.id] || {
    quote: '"캐릭터의 대사가 준비 중입니다."',
    description: '캐릭터의 설명이 준비 중입니다.',
    traits: ['준비 중']
  };

  return (
    <div className="mb-8">
      {/* 캐릭터 대사 */}
      <div>
        <p className="text-3xl font-bold text-gray-800 italic font-serif">
          {currentCharacter.quote}
        </p>
      </div>

      {/* 캐릭터 설명 */}
      <div className="mt-12">
        <p className="text-sm text-gray-500 mb-2">캐릭터 설명</p>
        <p className="text-gray-700 leading-relaxed text-base">
          {currentCharacter.description}
        </p>
      </div>

      {/* 캐릭터 특징 키워드 */}
      <div className="mt-8">
        <p className="text-sm text-gray-500 mb-3">캐릭터 묘사</p>
        <div className="flex flex-wrap gap-2">
          {currentCharacter.traits.map((trait, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo; 