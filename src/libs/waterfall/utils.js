// 获取所有img标签
export const getImgEle = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

// 获取所有图片的src
export const getImgSrc = (imgElements) => {
  return imgElements.map(imgElement => {
    return imgElement.src
  })
}

// 判断所有图片是否加载完成
export const awaitImgLoaded = (allImgs) => {
  let promiseAll = []
  allImgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      let imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}