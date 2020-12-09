## taro3.x的modal组件

使用方法

```
  npm install taro-modal --save

  import Modal from 'taro-modal'

```

样式为less实现

可以直接组件调用，也可以使用ref直接调用confirm、alert、close方法
```
  const modal = useRef()
  ...

  <View>
    <Button onClick={() => {
      modal.current.confirm({
        title: '系统消息',
        content: '这是内容'
      })
    }}>显示Modal</Button>
    <Modal ref={modal} />
  </View>
```