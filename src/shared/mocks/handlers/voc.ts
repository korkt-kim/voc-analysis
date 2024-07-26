import { isNil } from 'lodash-es'
import { http, HttpResponse } from 'msw'

import { dayjs, Labels, Model, Sentiments, Status } from '@/shared'

export interface VOC {
  id: string
  title: string
  detail: string
  tags: string[]
  carModel: Model
  createdAt: string
  author: string
  attachments: {
    type: string
    uri: string
  }
  status: (typeof Status)[number]
  assignee: string
  sentiment: (typeof Sentiments)[number]
  label: (typeof Labels)[number]
}

const items: VOC[] = [
  {
    id: 'issue-1',
    title: '차량 출고 문의',
    detail: '제가 주문한 차량이 언제쯤 출고가 될까요?',
    tags: ['tag-5'],
    carModel: 'AVANTE',
    createdAt: '2024-05-20',
    author: 'user-58',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-1',
    status: 'assigned',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/other_question_1.pdf',
    },
  },
  {
    id: 'issue-2',
    title: '에어컨이 안 시원해요',
    detail:
      '에어컨을 틀어도 시원하지 않아요. 에어컨 필터 청소를 해야할까요? 필터 교체 주기는 얼마나 되나요?',
    tags: ['tag-4', 'tag-2'],
    carModel: 'AVANTE',
    createdAt: '2024-07-13',
    author: 'user-59',
    label: 'complaints',
    sentiment: 'critical',
    assignee: 'user-2',
    status: 'in progress',
    attachments: {
      type: 'image',
      uri: 'http://example.com/attachments/other_question_2.jpg',
    },
  },
  {
    id: 'issue-3',
    title: '차량 구매 절차가 어떻게 되나요?',
    detail:
      '차량 구매 시 필요한 서류와 절차에 대해 알고 싶습니다. 너무 복잡한거 아니에요?',
    tags: ['tag-1', 'tag-3'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-26',
    author: 'user-60',
    label: 'complaints',
    sentiment: 'negative',
    assignee: 'user-3',
    status: 'in progress',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/purchase_procedure.pdf',
    },
  },
  {
    id: 'issue-4',
    title: '차량 옵션 선택 방법',
    detail: '차량 구매 시 선택할 수 있는 옵션에 대해 알고 싶습니다.',
    tags: ['tag-1', 'tag-2'],
    carModel: 'AVANTE',
    createdAt: '2024-01-12',
    label: 'question',
    author: 'user-57',
    sentiment: 'neutral',
    assignee: 'user-4',
    status: 'in progress',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/options_guide.pdf',
    },
  },
  {
    id: 'issue-5',
    title: '신차 할인 프로모션',
    detail: '현재 진행 중인 신차 할인 프로모션이 있나요?',
    tags: ['tag-5'],
    carModel: 'AVANTE',
    createdAt: '2024-05-18',
    author: 'user-56',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-5',
    status: 'resolved',
    attachments: {
      type: 'image',
      uri: 'http://example.com/attachments/promotion.jpg',
    },
  },
  {
    id: 'issue-6',
    title: '차가 너무 예뻐요',
    detail: '현대자동차는 중고차도 어쩜 이리 예뻐요',
    tags: ['tag-1', 'tag-5'],
    carModel: 'GRANDEUR',
    createdAt: '2024-06-14',
    label: 'praise',
    author: 'user-55',
    sentiment: 'positive',
    assignee: 'user-6',
    status: 'assigned',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/used_car_purchase.pdf',
    },
  },
  {
    id: 'issue-7',
    title: '차량 점검 주기',
    detail: '정기 점검은 얼마나 자주 받아야 하나요?',
    tags: ['tag-4', 'tag-5'],
    carModel: 'GRANDEUR',
    createdAt: '2024-03-10',
    author: 'user-54',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-7',
    status: 'in progress',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/maintenance_schedule.pdf',
    },
  },
  {
    id: 'issue-8',
    title: '타이어 교체 주기',
    detail: '타이어는 얼마나 자주 교체해야 하나요?',
    tags: ['tag-4'],
    carModel: 'AVANTE',
    createdAt: '2024-07-05',
    author: 'user-53',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-8',
    status: 'in progress',
    attachments: {
      type: 'image',
      uri: 'http://example.com/attachments/tire_replacement.jpg',
    },
  },
  {
    id: 'issue-9',
    title: '엔진 오일 교환 시기',
    detail: '엔진 오일 교환 주기는 어떻게 되나요?',
    tags: ['tag-4'],
    carModel: 'AVANTE',
    createdAt: '2024-07-26',
    author: 'user-52',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-9',
    status: 'in progress',
    attachments: {
      type: 'video',
      uri: 'http://example.com/attachments/oil_change.mp4',
    },
  },
  {
    id: 'issue-10',
    title: '브레이크 패드 교체 방법',
    detail: '브레이크 패드는 어떻게 교체하나요?',
    tags: ['tag-3', 'tag-4'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-22',
    author: 'user-51',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-10',
    status: 'in progress',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/brake_pad_replacement.pdf',
    },
  },
  {
    id: 'issue-11',
    title: '에어컨 필터 교체 주기',
    detail: '에어컨 필터는 얼마나 자주 교체해야 하나요?',
    tags: ['tag-2'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-26',
    author: 'user-50',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-1',
    status: 'in progress',
    attachments: {
      type: 'image',
      uri: 'http://example.com/attachments/ac_filter.jpg',
    },
  },
  {
    id: 'issue-12',
    title: '현대 디지털 키 설정 방법',
    detail: '현대 디지털 키는 어떻게 설정하나요?',
    tags: ['tag-2', 'tag-3'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-15',
    author: 'user-49',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-1',
    status: 'resolved',
    attachments: {
      type: 'video',
      uri: 'http://example.com/attachments/digital_key_setup.mp4',
    },
  },
  {
    id: 'issue-13',
    title: '디지털 키 사용 중 오류 해결',
    detail: '현대 디지털 키 사용 중 발생하는 오류를 어떻게 해결하나요?',
    tags: ['tag-2'],
    carModel: 'AVANTE',
    createdAt: '2024-07-22',
    label: 'bug',
    author: 'user-48',
    sentiment: 'critical',
    assignee: 'user-2',
    status: 'in progress',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/digital_key_error.pdf',
    },
  },
  {
    id: 'issue-14',
    title: '디지털 키 초기화 방법',
    detail: '디지털 키를 초기화하려면 어떻게 해야 하나요?',
    tags: ['tag-1'],
    carModel: 'AVANTE',
    createdAt: '2024-06-14',
    label: 'question',
    author: 'user-47',
    sentiment: 'neutral',
    assignee: 'user-1',
    status: 'in progress',
    attachments: {
      type: 'image',
      uri: 'http://example.com/attachments/digital_key_reset.jpg',
    },
  },
  {
    id: 'issue-15',
    title: '디지털 키 배터리 교체',
    detail: '디지털 키의 배터리는 어떻게 교체하나요?',
    tags: ['tag-5'],
    carModel: 'GRANDEUR',
    createdAt: '2024-03-10',
    author: 'user-46',
    label: 'question',
    sentiment: 'neutral',
    status: 'in progress',
    assignee: 'user-1',
    attachments: {
      type: 'video',
      uri: 'http://example.com/attachments/digital_key_battery.mp4',
    },
  },
  {
    id: 'issue-16',
    title: '디지털 키의 보안 제안',
    detail: '디지털 키의 보안을 강화해야할 것 같습니다.',
    tags: ['tag-3'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-21',
    author: 'user-45',
    label: 'enhancement',
    sentiment: 'neutral',
    status: 'in progress',
    assignee: 'user-2',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/digital_key_security.pdf',
    },
  },
  {
    id: 'issue-17',
    title: '서비스센터 위치 확인 방법',
    detail: '가장 가까운 서비스센터 위치를 확인하려면 어떻게 하나요?',
    tags: ['tag-4'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-26',
    author: 'user-44',
    label: 'question',
    sentiment: 'neutral',
    status: 'in progress',
    assignee: 'user-1',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/service_center_location.pdf',
    },
  },
  {
    id: 'issue-18',
    title: '서비스 예약 방법',
    detail: '서비스 예약을 하려면 어떻게 해야 하나요?',
    tags: ['tag-3'],
    carModel: 'AVANTE',
    createdAt: '2024-07-12',
    author: 'user-43',
    label: 'question',
    sentiment: 'neutral',
    status: 'in progress',
    assignee: 'user-1',
    attachments: {
      type: 'image',
      uri: 'http://example.com/attachments/service_booking.jpg',
    },
  },
  {
    id: 'issue-19',
    title: '서비스센터 운영 시간',
    detail: '서비스센터의 운영 시간은 어떻게 되나요?',
    tags: ['tag-2'],
    carModel: 'AVANTE',
    createdAt: '2024-05-18',
    author: 'user-42',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-1',
    status: 'in progress',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/service_hours.pdf',
    },
  },
  {
    id: 'issue-20',
    title: '비용이 너무 비싸요',
    detail: '자동차 비용이 너무 비싸요?',
    tags: ['tag-1'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-14',
    author: 'user-41',
    label: 'complaints',
    sentiment: 'negative',
    assignee: 'user-2',
    status: 'in progress',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/service_cost.pdf',
    },
  },
  {
    id: 'issue-21',
    title: '긴급 출동 서비스',
    detail: '긴급 출동 서비스를 요청하려면 어떻게 해야 하나요?',
    tags: ['tag-1'],
    carModel: 'GRANDEUR',
    createdAt: '2024-07-20',
    author: 'user-40',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-2',
    status: 'assigned',
    attachments: {
      type: 'video',
      uri: 'http://example.com/attachments/emergency_service.mp4',
    },
  },
  {
    id: 'issue-22',
    title: '차량 대여 서비스',
    detail: '서비스센터 방문 시 차량 대여가 가능한가요?',
    tags: ['tag-1', 'tag-4'],
    carModel: 'GRANDEUR',
    createdAt: '2024-03-10',
    author: 'user-39',
    label: 'question',
    sentiment: 'neutral',
    assignee: 'user-1',
    status: 'resolved',
    attachments: {
      type: 'document',
      uri: 'http://example.com/attachments/car_rental_service.pdf',
    },
  },
]

export const handlers = [
  http.get('http://www.example.com/api/issues', ({ request }) => {
    const url = new URL(request.url)

    const limit = isNil(url.searchParams.get('limit'))
      ? 10
      : Number(url.searchParams.get('limit'))
    const page = isNil(url.searchParams.get('page'))
      ? 1
      : Number(url.searchParams.get('page'))

    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')

    const filteredVocs = items
      .filter(item =>
        startDate ? dayjs(item.createdAt) >= dayjs(startDate) : true
      )
      .filter(item =>
        endDate ? dayjs(item.createdAt) <= dayjs(endDate) : true
      )

    return HttpResponse.json({
      items: filteredVocs.slice((page - 1) * limit, page * limit),
      total: filteredVocs.length,
    })
  }),

  http.get(
    'http://www.example.com/api/:modelId/issues',
    ({ request, params }) => {
      const url = new URL(request.url)
      const { modelId } = params

      const limit = isNil(url.searchParams.get('limit'))
        ? 10
        : Number(url.searchParams.get('limit'))
      const page = isNil(url.searchParams.get('page'))
        ? 1
        : Number(url.searchParams.get('page'))

      const startDate = url.searchParams.get('startDate')
      const endDate = url.searchParams.get('endDate')

      const filteredVocs = items
        .filter(item => item.carModel === modelId)
        .filter(item =>
          startDate ? dayjs(item.createdAt) >= dayjs(startDate) : true
        )
        .filter(item =>
          endDate ? dayjs(item.createdAt) <= dayjs(endDate) : true
        )

      return HttpResponse.json({
        items: filteredVocs.slice((page - 1) * limit, page * limit),
        total: filteredVocs.length,
      })
    }
  ),

  http.get('http://www.example.com/api/issue/:issueId', ({ params }) => {
    const { issueId } = params

    const filteredVoc = items.find(item => item.id === issueId)

    return HttpResponse.json(filteredVoc)
  }),
]
