/** 高德地图工具 — JS API v2.0 */

declare global {
  interface Window {
    AMap: any
    _AMapSecurityConfig: { securityJsCode: string }
  }
}

/** 等待 AMap 加载就绪 */
export function waitForAMap(timeout = 10000): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.AMap) { resolve(window.AMap); return }
    let elapsed = 0
    const timer = setInterval(() => {
      if (window.AMap) { clearInterval(timer); resolve(window.AMap); return }
      elapsed += 200
      if (elapsed >= timeout) { clearInterval(timer); reject(new Error('AMap 加载超时')) }
    }, 200)
  })
}

/** 根据关键词搜索 POI */
export async function searchPOI(keyword: string, city = '威海') {
  await waitForAMap()
  return new Promise<{ lng: number; lat: number; name: string; address: string } | null>((resolve) => {
    const ps = new window.AMap.PlaceSearch({ city, pageSize: 1 })
    ps.search(keyword, (status: string, result: any) => {
      if (status === 'complete' && result.poiList?.pois?.length > 0) {
        const p = result.poiList.pois[0]
        resolve({ lng: p.location.lng, lat: p.location.lat, name: p.name, address: p.paddress || p.address })
      } else {
        resolve(null)
      }
    })
  })
}

/** 创建地图实例 */
export function createMap(container: string | HTMLElement, options?: Record<string, any>) {
  return new window.AMap.Map(container, {
    zoom: 14,
    ...options,
  })
}
