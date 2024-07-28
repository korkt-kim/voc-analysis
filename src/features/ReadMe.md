components 폴더를 entities로 변경. onClick 이벤트 등의 행위가 적용된다.

```ts

export default function ForkButton(){
    const onClickFork = () =>{
        console.log("fork 버튼 클릭")
    }

    return (
        <SharedButton1 />
    )
}
```

```html
<Shared.Button
  onClick="{forkFeatures.api.fork}"
  icon="{shared.icon.fork}"
  data="{forkEntity.model.forkCount}"></Shared.Button>
```

총정리

- app: 전역설정, Provider, Router, Client 같은 HOC가 slice
- pages: 주소별 페이지 / 각각의 주소별 페이지가 slice
- widgets: layout 혹은 features의 묶음
- features: 행동/동사가 slice. api segment에서는 해당 행동을 요청함
- entities: 데이터, api segment에서는 데이터를 조회
- shared: 공유 컴포넌트

app 컴포넌트에서는 모든것을 import 가능
shared는 다른곳 import 불가능

index.js/indext.ts 적극적으로 활용하여 index 만 import 하도록 하자.

몇개의 폴더는 생략가능

slice는 도메인 별로 나뉜다.
각 slice는 segment로 구성되고 segment는 api, UI, model, lib, consts로 구성됨
api: 필요한 서버 요청
UI: 슬라이스의 UI 컴포넌트
model: 비즈니스 로직, 즉 상태와의 상호작용. actions 및 selectors가 이에 해당
lib: 보조기능
consts: 상수
