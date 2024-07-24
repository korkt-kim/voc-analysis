import { http, HttpResponse } from 'msw'

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
        search: '엔진오일',
        hits: 5,
      },
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b4',
        search: '와이퍼',
        hits: 4,
      },
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b5',
        search: '승차감',
        hits: 3,
      },
    ])
  }),

  http.get(
    'http://www.example.com/api/:modelId/history/search',
    ({ request, params }) => {
      const url = new URL(request.url)
      const { modelId } = params

      return HttpResponse.json([
        {
          id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b0',
          search: '에어컨',
          hits: 5,
        },
        {
          id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b1',
          search: '수리',
          hits: 4,
        },
        {
          id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b2',
          search: '부동액',
          hits: 3,
        },
      ])
    }
  ),
]
