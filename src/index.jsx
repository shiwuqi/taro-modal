/**
 * 可以直接通过组件调用，通过组件调用时请不要maskClosable，使用传入的visible控制显示隐藏
 * 也可以通过ref的方式使用confirm、alert、close、show方法
 */
import React, { useState, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types';
import { View, Button, Block } from '@tarojs/components'
import './index.less'

const Modal = React.forwardRef((props, ref) => {
  const [ options, setOptions ] = useState(props)
  const [ visible, setVisible ] = useState(false)
  const [ classes, setClasses ] = useState('')
  useEffect(() => {
    if(options.visible){
      setVisible(true)
      setTimeout(() => {
        setClasses('at-modal-mask-show')
      }, 20)
    }else{
      setClasses('at-modal-mask-hide')
      setTimeout(() => {
        setVisible(false)
      }, 200)
    }
  }, [options.visible])

  useEffect(() => {
    setOptions(props)
  }, [props])

  const onCancel = () => {
    if(options.autoClosable) setOptions({...options, visible: false})
    if(options.onCancel && typeof options.onCancel === 'function'){
      options.onCancel()
    }
  }
  const onOk = () => {
    if(options.autoClosable) setOptions({...options, visible: false})
    if(options.onOk && typeof options.onOk === 'function'){
      options.onOk()
    }
  }
  // 暴露给上级组件通过ref调用的方法
  useImperativeHandle(ref, () => ({
    show: (arg) => {
      setOptions({
        ...props, 
        visible: true, 
        autoClosable: true,
        showCancel: true,
        ...arg 
      })
    },
    confirm: (arg) => {
      setOptions({
        ...props, 
        visible: true, 
        autoClosable: true,
        showCancel: true,
        ...arg 
      })
    },
    alert: (arg) => {
      setOptions({
        ...props, 
        visible: true, 
        autoClosable: true,
        showCancel: false,
        ...arg 
      })
    },
    close: () => {
      setOptions({ 
        ...props, 
        visible: false
      })
    }
  }))
  const { title, children, content, cancelText, okText, className, maskClosable, footer, showCancel, lang, openType,sessionFrom,
    sendMessageTitle,
    sendMessagePath,
    sendMessageImg,
    appParameter,
    showMessageCard,
    onGetUserInfo,
    onContact,
    onGetPhoneNumber,
    onError,
    onOpenSetting,
    onLaunchapp,
  } = options

  return (
    <View
      style={{ display: visible ? 'block':'none' }}
      onClick={maskClosable && onCancel}
      className={`at-modal-mask ${classes}} ${options.maskClass}`}
    >
      <View className={`at-modal-body ${className}`} onClick={(e) => {e.stopPropagation()}}>
        { title && <View className='at-modal-title'>{title}</View> }
        <View className={`at-modal-content  ${ title ? 'at-modal-body-has-title' : ''}`}>{children || content}</View>
        <View className='at-modal-footer'>
          {  
            footer ? footer : <Block>
              {showCancel && <Button onClick={onCancel}>{cancelText}</Button>}
              <Button 
                lang={lang} 
                onClick={onOk} 
                className='okButton'
                openType={openType}
                sessionFrom={sessionFrom}
                sendMessageTitle={sendMessageTitle}
                sendMessagePath={sendMessagePath}
                sendMessageImg={sendMessageImg}
                appParameter={appParameter}
                showMessageCard={showMessageCard}
                onGetUserInfo={onGetUserInfo}
                onContact={onContact}
                onGetPhoneNumber={onGetPhoneNumber}
                onError={onError}
                onOpenSetting={onOpenSetting}
                onLaunchapp={onLaunchapp}
              >{okText}</Button>
            </Block>
          }
        </View>
      </View>
    </View>
  )
})
Modal.defaultProps = {
  title: false, // 标题
  visible: false, // 是否显示
  className: '', // modal-body的类名
  okText: '确定', // 确定按钮文字
  cancelText: '取消', // 取消按钮文字
  maskClosable: true, // 点击蒙层是否关闭
  maskClass: '', // 蒙层类名
  showCancel: true, // 是否显示取消按钮
  autoClosable: false, // 点击确定后是否自动关闭
  lang: 'zh_CN', // 剩下属性请查看 http://taro-docs.jd.com/taro/docs/components/forms/button
  openType: '',
  sessionFrom: '',
  sendMessageTitle: '', 
  sendMessagePath: '',
  sendMessageImg: '',
  appParameter: '',
  showMessageCard: false,
  onGetUserInfo: () => {},
  onContact: () => {},
  onGetPhoneNumber: () => {},
  onError: () => {},
  onOpenSetting: () => {},
  onLaunchapp: () => {},
  onCancel: () => {}, // 点击取消时执行的函数
  onOk: () => {}, // 点击确定是执行的函数
};
Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element),PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.bool]),
  maskClosable: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  maskClass: PropTypes.string,
  showCancel: PropTypes.bool,
  autoClosable: PropTypes.bool,
  lang: PropTypes.string,
  openType: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  appParameter: PropTypes.string,
  showMessageCard: PropTypes.bool,
  onGetUserInfo: PropTypes.func,
  onContact: PropTypes.func,
  onGetPhoneNumber: PropTypes.func,
  onError: PropTypes.func,
  onOpenSetting: PropTypes.func,
  onLaunchapp: PropTypes.func,
};

export default Modal