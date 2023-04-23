import React from 'react'

function LiveStreamPage() {
  return (
    <div style={{verticalAlign:'center', paddingTop: '5vmax',width: "100vw", height: "100vh", background: '#222'}}>
        <iframe width="1280" height="720" src="https://www.youtube.com/embed/VWyNjD5G95I" title="테스트 JIT방송" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  )
}

export default LiveStreamPage