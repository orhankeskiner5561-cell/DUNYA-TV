export function playbackReport(channel, attempts) {
  return JSON.stringify({version:"1.0",channel,time:new Date().toISOString(),attempts:attempts.map(a=>({source:a.source?new URL(a.source).origin+new URL(a.source).pathname:null,http:a.http||null,type:a.type||null,detail:a.detail||null,message:explain(a)}))},null,2);
}
export function explain(a) {
  if(a.http===403)return "Erişim reddedildi";
  if(a.http===404)return "Yayın adresi bulunamadı";
  if(a.http===401)return "Yetkilendirme gerekiyor";
  if(/timeout/i.test(a.detail||""))return "Bağlantı zaman aşımı";
  if(a.detail==="NotAllowedError")return "Oynat düğmesine basın";
  if(a.http===0||!a.http&&a.type==="networkError")return "Ağ veya tarayıcı erişim hatası; kesin neden belirlenemedi";
  return a.detail||a.type||"Bilinmeyen oynatma hatası";
}
export async function copyReport(channel,attempts){await navigator.clipboard.writeText(playbackReport(channel,attempts));}
