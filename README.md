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


### 属性
title: false, // 标题  
visible: false, // 是否显示  
className: '', // modal-body的类名  
okText: '确定', // 确定按钮文字  
cancelText: '取消', // 取消按钮文字  
maskClosable: true, // 点击蒙层是否关闭  
maskClass: '', // 蒙层类名  
showCancel: true, // 是否显示取消按钮  
autoClosable: false, // 点击确定后是否自动关闭  
lang: 'zh_CN', // 剩下属性请查看 [http://taro-docs.jd.com/taro/docs/components/forms/button](http://taro-docs.jd.com/taro/docs/components/forms/button)  
openType: '',  
sessionFrom: '',  
sendMessageTitle: '',   
sendMessagePath: '',  
sendMessageImg: '',  
appParameter: '',  
showMessageCard: false,  

### 函数
onGetUserInfo: () => {},  
onContact: () => {},  
onGetPhoneNumber: () => {},  
onError: () => {},  
onOpenSetting: () => {},  
onLaunchapp: () => {},  
onCancel: () => {}, // 点击取消时执行的函数  
onOk: () => {}, // 点击确定是执行的函数  