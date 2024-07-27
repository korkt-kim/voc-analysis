import { http, HttpResponse } from 'msw'

const encoder = new TextEncoder()

const SummaryText = `<ol>
<li>
  <p>
    <b>앱 기능 및 연결</b> 문제 많은 고객들이 앱의 기능 및 연결
    문제에 대한 불만을 제기했습니다. 예를 들어, "앱이 자주
    연결을 잃고, TV를 제대로 연결하지 못한다"와 "스마트홈 앱이
    자주 끊기고 새로운 콘텐츠 업로드가 어렵다"는 피드백이
    있었습니다. 또 다른 고객은 "앱 업데이트 후 무한 로딩 및 연결
    문제 해결이 필요하다"고 했습니다.
  </p>
</li>
<li>
  <p>
    <b>고객 서비스 대응 지연</b> 고객들은 고객 서비스의 느린
    대응에 불만을 표시했습니다. 한 고객은 "기술 지원과의 상담
    시간이 오래 걸렸다"며 불만을 표시했습니다. 또 다른 고객은
    "최근 UI 업데이트에 불만이 있어 제품을 구매하지 않을
    생각"이라고 했습니다.
  </p>
</li>
<li>
  <p>
    <b>제품 내구성 및 성능</b> 문제 제품의 내구성과 성능에 대한
    불만도 다수 접수되었습니다. 예를 들어, "에어컨 동기화 문제와
    느린 온도 조절에 불만이 있다"고 했습니다. 또 다른 고객은
    "냉장고의 디자인, 기능, 내구성에 실망했다"고 언급했습니다.
  </p>
</li>
<li>
  <p>
    <b>업데이트로 인한 문제</b> 많은 고객들이 업데이트로 인한
    기능 저하와 문제에 대한 불만을 제기했습니다. "업데이트 후
    연결 문제가 발생했고 원격 제어가 불편하다"는 피드백이
    있었습니다. 또 다른 고객은 "업데이트 후 기기의 일부 기능이
    제대로 작동하지 않는다"고 했습니다.
  </p>
</li>
<li>
  <p>
    <b>앱 사용성 및 인터페이스</b> 고객들은 앱의 사용성과
    인터페이스에 대해 불만을 표시했습니다. 예를 들어, "UI
    디자인과 사용자 경험에 만족하지 못한다"며 개선을
    요청했습니다. 또 다른 고객은 "위젯 정렬 옵션의 변경으로
    사용이 불편하다"고 했습니다.
  </p>
</li>
</ol>`

export interface HistoroyOfSearch {
  id: string
  search: string
  hits: number
}

export const handlers = [
  http.get('http://www.example.com/api/history/search', () => {
    return HttpResponse.json([
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3',
        search: '엔진오일 교체주기',
        hits: 5,
      },
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b4',
        search: '와이퍼 교체주기',
        hits: 4,
      },
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b5',
        search: '에어컨',
        hits: 3,
      },
    ] satisfies HistoroyOfSearch[])
  }),

  http.get(
    'http://www.example.com/api/:modelId/history/search',
    ({ request, params }) => {
      const url = new URL(request.url)
      const { modelId } = params

      return HttpResponse.json([
        {
          id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b0',
          search: '에어컨 고장',
          hits: 5,
        },
        {
          id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b1',
          search: '수리 장소',
          hits: 4,
        },
        {
          id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b2',
          search: '에어컨',
          hits: 3,
        },
      ] satisfies HistoroyOfSearch[])
    }
  ),
]
