import { isNil } from 'lodash-es'
import { http, HttpResponse } from 'msw'

export interface User {
  id: string
  email: string
  username: string
  type: 'employee' | 'user'
}

const users: User[] = [
  {
    id: 'user-1',
    email: 'employee1@example.com',
    username: '김철수',
    type: 'employee',
  },
  {
    id: 'user-2',
    email: 'employee2@example.com',
    username: '이영희',
    type: 'employee',
  },
  {
    id: 'user-3',
    email: 'employee3@example.com',
    username: '박민수',
    type: 'employee',
  },
  {
    id: 'user-4',
    email: 'employee4@example.com',
    username: '최지훈',
    type: 'employee',
  },
  {
    id: 'user-5',
    email: 'employee5@example.com',
    username: '강은주',
    type: 'employee',
  },
  {
    id: 'user-6',
    email: 'employee6@example.com',
    username: '윤지수',
    type: 'employee',
  },
  {
    id: 'user-7',
    email: 'employee7@example.com',
    username: '정해준',
    type: 'employee',
  },
  {
    id: 'user-8',
    email: 'employee8@example.com',
    username: '임선영',
    type: 'employee',
  },
  {
    id: 'user-9',
    email: 'employee9@example.com',
    username: '오성민',
    type: 'employee',
  },
  {
    id: 'user-10',
    email: 'employee10@example.com',
    username: '신예진',
    type: 'employee',
  },
  {
    id: 'user-11',
    email: 'user1@example.com',
    username: '김영수',
    type: 'user',
  },
  {
    id: 'user-12',
    email: 'user2@example.com',
    username: '이민주',
    type: 'user',
  },
  {
    id: 'user-13',
    email: 'user3@example.com',
    username: '박지혜',
    type: 'user',
  },
  {
    id: 'user-14',
    email: 'user4@example.com',
    username: '최강민',
    type: 'user',
  },
  {
    id: 'user-15',
    email: 'user5@example.com',
    username: '강민준',
    type: 'user',
  },
  {
    id: 'user-16',
    email: 'user6@example.com',
    username: '윤예린',
    type: 'user',
  },
  {
    id: 'user-17',
    email: 'user7@example.com',
    username: '정현우',
    type: 'user',
  },
  {
    id: 'user-18',
    email: 'user8@example.com',
    username: '임다연',
    type: 'user',
  },
  {
    id: 'user-19',
    email: 'user9@example.com',
    username: '오하늘',
    type: 'user',
  },
  {
    id: 'user-20',
    email: 'user10@example.com',
    username: '신동민',
    type: 'user',
  },
  {
    id: 'user-21',
    email: 'user11@example.com',
    username: '김수민',
    type: 'user',
  },
  {
    id: 'user-22',
    email: 'user12@example.com',
    username: '이서준',
    type: 'user',
  },
  {
    id: 'user-23',
    email: 'user13@example.com',
    username: '박은서',
    type: 'user',
  },
  {
    id: 'user-24',
    email: 'user14@example.com',
    username: '최도현',
    type: 'user',
  },
  {
    id: 'user-25',
    email: 'user15@example.com',
    username: '강시우',
    type: 'user',
  },
  {
    id: 'user-26',
    email: 'user16@example.com',
    username: '윤지안',
    type: 'user',
  },
  {
    id: 'user-27',
    email: 'user17@example.com',
    username: '정서윤',
    type: 'user',
  },
  {
    id: 'user-28',
    email: 'user18@example.com',
    username: '임준서',
    type: 'user',
  },
  {
    id: 'user-29',
    email: 'user19@example.com',
    username: '오예원',
    type: 'user',
  },
  {
    id: 'user-30',
    email: 'user20@example.com',
    username: '신채연',
    type: 'user',
  },
  {
    id: 'user-31',
    email: 'employee1@company.com',
    username: '김하늘',
    type: 'employee',
  },
  {
    id: 'user-32',
    email: 'employee2@company.com',
    username: '이도연',
    type: 'employee',
  },
  {
    id: 'user-33',
    email: 'employee3@company.com',
    username: '박서윤',
    type: 'employee',
  },
  {
    id: 'user-34',
    email: 'employee4@company.com',
    username: '최민준',
    type: 'employee',
  },
  {
    id: 'user-35',
    email: 'employee5@company.com',
    username: '강서현',
    type: 'employee',
  },
  {
    id: 'user-36',
    email: 'employee6@company.com',
    username: '윤지민',
    type: 'employee',
  },
  {
    id: 'user-37',
    email: 'employee7@company.com',
    username: '정도현',
    type: 'employee',
  },
  {
    id: 'user-38',
    email: 'employee8@company.com',
    username: '임하윤',
    type: 'employee',
  },
  {
    id: 'user-39',
    email: 'employee9@company.com',
    username: '오지우',
    type: 'employee',
  },
  {
    id: 'user-40',
    email: 'employee10@company.com',
    username: '신서준',
    type: 'employee',
  },
  {
    id: 'user-41',
    email: 'user1@service.com',
    username: '김다은',
    type: 'user',
  },
  {
    id: 'user-42',
    email: 'user2@service.com',
    username: '이주원',
    type: 'user',
  },
  {
    id: 'user-43',
    email: 'user3@service.com',
    username: '박채원',
    type: 'user',
  },
  {
    id: 'user-44',
    email: 'user4@service.com',
    username: '최하민',
    type: 'user',
  },
  {
    id: 'user-45',
    email: 'user5@service.com',
    username: '강민서',
    type: 'user',
  },
  {
    id: 'user-46',
    email: 'user6@service.com',
    username: '윤도윤',
    type: 'user',
  },
  {
    id: 'user-47',
    email: 'user7@service.com',
    username: '정지우',
    type: 'user',
  },
  {
    id: 'user-48',
    email: 'user8@service.com',
    username: '임예준',
    type: 'user',
  },
  {
    id: 'user-49',
    email: 'user9@service.com',
    username: '오수아',
    type: 'user',
  },
  {
    id: 'user-50',
    email: 'user10@service.com',
    username: '신민호',
    type: 'user',
  },
  {
    id: 'user-51',
    email: 'user11@service.com',
    username: '김지호',
    type: 'user',
  },
  {
    id: 'user-52',
    email: 'user12@service.com',
    username: '이윤서',
    type: 'user',
  },
  {
    id: 'user-53',
    email: 'user13@service.com',
    username: '박다인',
    type: 'user',
  },
  {
    id: 'user-54',
    email: 'user14@service.com',
    username: '최건우',
    type: 'user',
  },
  {
    id: 'user-55',
    email: 'user15@service.com',
    username: '강예린',
    type: 'user',
  },
  {
    id: 'user-56',
    email: 'user16@service.com',
    username: '윤하은',
    type: 'user',
  },
  {
    id: 'user-57',
    email: 'user17@service.com',
    username: '정서준',
    type: 'user',
  },
  {
    id: 'user-58',
    email: 'user18@service.com',
    username: '임주아',
    type: 'user',
  },
  {
    id: 'user-59',
    email: 'user19@service.com',
    username: '오민서',
    type: 'user',
  },
  {
    id: 'user-60',
    email: 'user20@service.com',
    username: '신주원',
    type: 'user',
  },
] as const

export const handlers = [
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url)

    const type = url.searchParams.get('type')
    const limit = isNil(url.searchParams.get('limit'))
      ? 10
      : Number(url.searchParams.get('limit'))
    const page = isNil(url.searchParams.get('page'))
      ? 1
      : Number(url.searchParams.get('page'))

    const filteredUsers: User[] = users.filter(user =>
      type ? user.type === type : true
    )

    return HttpResponse.json({
      items: filteredUsers.slice((page - 1) * limit, page * limit),
      total: filteredUsers.length,
    })
  }),

  http.get('/api/:modelId/users', ({ request, params }) => {
    const url = new URL(request.url)
    const { modelId } = params

    const type = url.searchParams.get('type')
    const limit = isNil(url.searchParams.get('limit'))
      ? 10
      : Number(url.searchParams.get('limit'))
    const page = isNil(url.searchParams.get('page'))
      ? 1
      : Number(url.searchParams.get('page'))

    const filteredUsers: User[] = users.filter(user =>
      type ? user.type === type : true
    )

    return HttpResponse.json({
      items: filteredUsers.slice((page - 1) * limit, page * limit),
      total: filteredUsers.length,
    })
  }),
]
