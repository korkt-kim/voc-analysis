import { http, HttpResponse } from 'msw'

const encoder = new TextEncoder()

const SummaryText = `
    1. <b>엔진 및 성능 문제</b> 많은 고객들이 자동차의 엔진 성능 및 성능 저하에 대한 불만을 제기했습니다. 예를 들어, "엔진이 자주 꺼지고 가속이 부드럽지 않다"와 "고속도로 주행 중 엔진 소음이 크다"는 피드백이 있었습니다. 또 다른 고객은 "최근 모델의 연비가 기대에 미치지 못한다"고 했습니다.

    2. <b>고객 서비스 대응 지연</b> 고객들은 자동차 서비스 센터의 느린 대응에 불만을 표시했습니다. 한 고객은 "수리 예약 시간이 길어졌다"며 불만을 표시했습니다. 또 다른 고객은 "문제 해결을 위해 여러 번 방문해야 했다"고 했습니다.

    3. <b>내부 인테리어 및 편의 기능</b> 제품의 내부 인테리어와 편의 기능에 대한 불만도 다수 접수되었습니다. 예를 들어, "시트 재질이 불편하고 내구성이 부족하다"고 했습니다. 또 다른 고객은 "내비게이션 시스템이 자주 오류를 일으키고 업데이트가 어렵다"고 언급했습니다.
  
    4. <b>업데이트로 인한 문제</b> 많은 고객들이 소프트웨어 업데이트로 인한 기능 저하와 문제에 대한 불만을 제기했습니다. "업데이트 후 인포테인먼트 시스템이 느려졌고, 일부 기능이 제대로 작동하지 않는다"는 피드백이 있었습니다. 또 다른 고객은 "업데이트 후 블루투스 연결 문제가 발생했다"고 했습니다.
  

`

export const handlers = [
  http.get('/api/history/summary', () => {
    const stream = new ReadableStream({
      start(controller) {
        SummaryText.split('').forEach((_, index, origin) => {
          // const func = (asdf:string) => new Promise((resolve,reject)=> setTimeout(() => {
          //     acc
          //     resolve(asdf)
          // },200))

          // await func(acc)
          setTimeout(() => {
            controller.enqueue(
              encoder.encode(
                `event:message\ndata:${origin.slice(0, index).join('').replaceAll('\n', '<br/>')}\n\n`
              )
            )
            if (index === origin.length) {
              controller.close()
            }
          }, index * 15)
        })
      },
    })

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    })
  }),

  http.get('/api/:modelId/history/summary', () => {
    const stream = new ReadableStream({
      start(controller) {
        SummaryText.split('').forEach((_, index, origin) => {
          setTimeout(() => {
            controller.enqueue(
              encoder.encode(
                `event:message\ndata:${origin.slice(0, index).join('').replaceAll('\n', '<br/>')}\n\n`
              )
            )
            if (index === origin.length) {
              controller.close()
            }
          }, index * 15)
        })
      },
    })

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    })
  }),
]
