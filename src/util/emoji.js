import { objVal, getDom } from './tool'

const smile = className => {
  const mouseDom = getDom(className, '.iclock-body .iclock-mouse')
  objVal({
    borderTop: '80px solid #ccc',
    borderLeft: '80px solid transparent',
    borderRight: '80px solid transparent'
  }, mouseDom)
}

const angry = className =>{
  const mouseDom = getDom(className, '.iclock-body .iclock-mouse')
  objVal({
    border: '40px solid #d53a35',
    borderRadius: '10%'
  }, mouseDom)
}

const jiong = className => {
  const mouseDom = getDom(className, '.iclock-body .iclock-mouse')
  const leftDom = getDom(className, '.iclock-body .iclock-left-eyes')
  const rightDom = getDom(className, '.iclock-body .iclock-right-eyes')
  let deg = 10
  objVal({
    transform: `rotate(${-deg}deg)`,
    webkitTransform: `rotate(${-deg}deg)`
  }, leftDom)
  objVal({
    transform: `rotate(${deg}deg)`,
    webkitTransform: `rotate(${deg}deg)`
  }, rightDom)
  objVal({
    border: '40px solid #e98f6f',
    borderRadius: '10%',
    left: '56px',
    width: '10px'
  }, mouseDom)
}

export {
  smile,
  angry,
  jiong
}