import { isNil } from 'lodash-es'
import { http, HttpResponse } from 'msw'

//enhancement, bug, praise, question, complaints, others

export interface Tag {
  id: string
  tagName: string
  meaning: 'negative' | 'neutral' | 'positive'
  threshold: number // 해당 태그가 얾마나 긍정/부정/중립 적인지
}

export const handlers = [
  http.get('http://www.example.com/api/tags', ({ request }) => {
    const url = new URL(request.url)

    const limit = isNil(url.searchParams.get('limit'))
      ? 10
      : Number(url.searchParams.get('limit'))
    const page = isNil(url.searchParams.get('page'))
      ? 1
      : Number(url.searchParams.get('page'))

    const tags: Tag[] = [
      {
        id: 'tag-1',
        tagName: '품질',
        meaning: 'positive',
        threshold: 50,
      },
      {
        id: 'tag-2',
        tagName: '배송 지연',
        meaning: 'negative',
        threshold: 90,
      },
      {
        id: 'tag-3',
        tagName: '친절한 서비스',
        meaning: 'positive',
        threshold: 100,
      },
      {
        id: 'tag-4',
        tagName: '가격 불만',
        meaning: 'negative',
        threshold: 100,
      },
      {
        id: 'tag-5',
        tagName: '기능 제안',
        meaning: 'neutral',
        threshold: 70,
      },
    ] as const

    return HttpResponse.json({
      items: tags.slice((page - 1) * limit, page * limit),
      total: tags.length,
    })
  }),

  http.get(
    'http://www.example.com/api/:modelId/tags',
    ({ request, params }) => {
      const url = new URL(request.url)
      const { modelId } = params

      const limit = isNil(url.searchParams.get('limit'))
        ? 10
        : Number(url.searchParams.get('limit'))
      const page = isNil(url.searchParams.get('page'))
        ? 1
        : Number(url.searchParams.get('page'))

      const tags: Tag[] = [
        {
          id: 'tag-3',
          tagName: '친절한 서비스',
          meaning: 'positive',
          threshold: 100,
        },
        {
          id: 'tag-4',
          tagName: '가격 불만',
          meaning: 'negative',
          threshold: 100,
        },
      ] as const

      return HttpResponse.json({
        items: tags.slice((page - 1) * limit, page * limit),
        total: tags.length,
      })
    }
  ),
]
