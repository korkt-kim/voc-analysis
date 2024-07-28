components 폴더를 entities로 변경. data 표현을 담당하는 부분
entities를 통해서 데이터를 api로 불러와서 넣어준다.

```ts
export default ForkButton(props: ButtonProps){
    const {data}= useGetForkedCount()

    return (<SharedButton1 {...props}>
        {props.icon}
        {props.children}
        {data.forkedCount}
    </SharedButton1>)
}
```
