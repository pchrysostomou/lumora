"use client";
import{useState,useRef,useCallback,useEffect,Suspense}from"react";
import{useParams,useRouter,useSearchParams}from"next/navigation";
import Link from"next/link";
import{nanoid}from"nanoid";
import{QRCodeSVG}from"qrcode.react";
import{PRODUCTS}from"@/lib/data";
import{formatPrice}from"@/lib/utils";
import{loadDraft,saveDraft,type DraftElement,type DraftPage}from"@/lib/storage";
import{Type,Image as II,QrCode,Layout,Square,Circle,Undo2,Redo2,Save,Eye,ShoppingCart,ChevronLeft,Plus,Trash2,Monitor,X,Copy}from"lucide-react";
type El=DraftElement;
type Page=DraftPage;
type Tab="images"|"templates"|"layouts"|"backgrounds"|"stickers";
const DT:Record<string,{bg:string;ac:string;lbl:string}>={
  "paris-book":{bg:"#F2C4CE",ac:"#8B1A4A",lbl:"PARIS 2025"},
  "greece-book":{bg:"#1565C0",ac:"#FFD600",lbl:"GREECE"},
  "italy-book":{bg:"#E64A19",ac:"#FFF9C4",lbl:"ITALY"},
  "japan-book":{bg:"#FAFAFA",ac:"#C62828",lbl:"JAPAN"},
  "bali-book":{bg:"#2E7D32",ac:"#F9A825",lbl:"BALI"},
  "nyc-book":{bg:"#212121",ac:"#FFD600",lbl:"NEW YORK"},
  "spain-book":{bg:"#F9A825",ac:"#C62828",lbl:"ESPANA"},
  "maldives-book":{bg:"#00ACC1",ac:"#FFFFFF",lbl:"MALDIVES"},
};
const DFL={bg:"#F5F5F5",ac:"#1A3A6B",lbl:"MY BOOK"};
const BGS=["#ffffff","#F2C4CE","#1565C0","#E64A19","#FAFAFA","#2E7D32","#212121","#F9A825","#00ACC1","#0B1629","#F7F0E6","#E8F5E9"];
const STKS=["❤️","🌸","✨","🌍","📷","🎉","🌊","🏔️","🦋","🌺","⭐","🎨","🌙","☀️","🏖️"];
function uid(){return`e${Date.now()}${Math.random().toString(36).slice(2,5)}`;}
function mkEl(type:El["type"],extra:Partial<El>={}):El{return{id:uid(),type,x:40,y:60,w:type==="text"?200:200,h:type==="text"?50:160,fill:"#1A3A6B",fontSize:22,content:type==="text"?"Your Text Here":type==="shape"?"rect":undefined,...extra};}
function mkPages(slug:string,t:{bg:string;ac:string;lbl:string}):Page[]{
  const pz=(x:number,y:number,w:number,h:number):El=>({id:uid(),type:"image",x,y,w,h,fill:"rgba(0,0,0,0.08)"});
  const txt=(x:number,y:number,w:number,h:number,content:string,fill:string,fontSize:number):El=>({id:uid(),type:"text",x,y,w,h,content,fill,fontSize});
  const pages:Page[]=[
    {id:"cover",label:"Cover",bg:t.bg,elements:[
      txt(20,20,300,60,t.lbl,t.ac,36),
      txt(20,88,300,36,"Your Name's Story",t.ac,18),
      pz(20,138,300,190),
    ]},
    {id:"p1",label:"Page 1",bg:"#fff",elements:[pz(20,30,300,200),txt(20,244,300,40,"Add your caption here","#555",16)]}
  ];
  const layouts:El[][]=[
    [pz(20,30,145,200),pz(175,30,145,200),txt(20,244,300,40,"A New Chapter","#333",20)],
    [pz(20,30,300,130),pz(20,175,145,100),pz(175,175,145,100)],
    [pz(20,30,300,240)],
    [pz(20,30,145,115),pz(175,30,145,115),pz(20,155,145,115),pz(175,155,145,115)],
    [pz(20,30,145,240),pz(175,30,145,240)],
    [pz(20,30,300,180),txt(20,220,300,50,"Unforgettable Memories","#333",18)],
    [pz(20,30,145,100),pz(175,30,145,100),pz(20,140,300,130)],
    [pz(20,30,300,240)],
    [pz(20,30,145,240),pz(175,30,145,240)]
  ];
  for(let i=0;i<9;i++){
    const start=i*2+2;
    pages.push({id:`p${start}`,label:`Page ${start}–${start+1}`,bg:"#fff",elements:layouts[i]});
  }
  return pages;
}
function readImageDrop(e:React.DragEvent):Promise<string|null>{
  const f=e.dataTransfer.files[0];
  if(f&&f.type.startsWith("image/")){
    return new Promise(res=>{const r=new FileReader();r.onload=ev=>res((ev.target?.result as string)||null);r.onerror=()=>res(null);r.readAsDataURL(f);});
  }
  const txt=e.dataTransfer.getData("text/plain");
  if(txt&&(txt.startsWith("data:image")||txt.startsWith("http")))return Promise.resolve(txt);
  return Promise.resolve(null);
}
function DragEl({el,onMove,onSel,sel,onDrop,onMoveStart,onMoveEnd,qrValue}:{el:El;onMove:(id:string,x:number,y:number)=>void;onSel:(id:string)=>void;sel:boolean;onDrop:(id:string,src:string)=>void;onMoveStart:()=>void;onMoveEnd:()=>void;qrValue:string|null}){
  const ref=useRef<HTMLDivElement>(null);
  const drag=useRef<{ox:number;oy:number}|null>(null);
  const pdown=(e:React.PointerEvent)=>{e.stopPropagation();onSel(el.id);if(ref.current)ref.current.setPointerCapture(e.pointerId);drag.current={ox:e.clientX-el.x,oy:e.clientY-el.y};onMoveStart();};
  const pmove=(e:React.PointerEvent)=>{if(!drag.current)return;onMove(el.id,e.clientX-drag.current.ox,e.clientY-drag.current.oy);};
  const pup=()=>{if(drag.current){drag.current=null;onMoveEnd();}};
  const s:React.CSSProperties={position:"absolute",left:el.x,top:el.y,width:el.w,height:el.h,cursor:"move",boxSizing:"border-box",border:sel?"2px solid #C4973A":"2px solid transparent"};
  if(el.type==="text")return<div ref={ref} style={{...s,fontSize:el.fontSize,fontWeight:700,color:el.fill,fontFamily:"'Playfair Display',serif",userSelect:"none",padding:"4px 8px"}} onPointerDown={pdown} onPointerMove={pmove} onPointerUp={pup}>{el.content}</div>;
  if(el.type==="image")return(
    <div ref={ref} style={{...s,background:el.src?"transparent":el.fill||"rgba(0,0,0,0.08)",borderRadius:6,overflow:"hidden"}} onPointerDown={pdown} onPointerMove={pmove} onPointerUp={pup}
      onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();readImageDrop(e).then(src=>{if(src)onDrop(el.id,src);});}}>
      {/* eslint-disable-next-line @next/next/no-img-element -- user photos are data URLs */}
      {el.src?<img src={el.src} alt="" draggable={false} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#aaa",gap:6}}><span style={{fontSize:28}}>🖼️</span><span style={{fontSize:12,fontWeight:600}}>Drag here</span></div>}
    </div>
  );
  if(el.type==="shape")return<div ref={ref} style={{...s,background:el.fill||"#1A3A6B",borderRadius:el.content==="ellipse"?"50%":8}} onPointerDown={pdown} onPointerMove={pmove} onPointerUp={pup}/>;
  if(el.type==="qr")return(
    <div ref={ref} style={{...s,background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,borderRadius:6,border:sel?"2px solid #C4973A":"2px solid #ddd",padding:4}} onPointerDown={pdown} onPointerMove={pmove} onPointerUp={pup}>
      {qrValue?<QRCodeSVG value={qrValue} size={Math.max(24,Math.min(el.w,el.h)-24)} bgColor="#fff" fgColor="#0B1629" level="M"/>:<span style={{fontSize:12,color:"#888"}}>QR Code</span>}
      <span style={{fontSize:7,color:"#999",letterSpacing:".05em"}}>SCAN FOR MEMORIES</span>
    </div>
  );
  return null;
}
function StaticEl({el,qrValue}:{el:El;qrValue:string|null}){
  const s:React.CSSProperties={position:"absolute",left:el.x,top:el.y,width:el.w,height:el.h,boxSizing:"border-box"};
  if(el.type==="text")return<div style={{...s,fontSize:el.fontSize,fontWeight:700,color:el.fill,fontFamily:"'Playfair Display',serif",padding:"4px 8px"}}>{el.content}</div>;
  // eslint-disable-next-line @next/next/no-img-element -- user photos are data URLs
  if(el.type==="image")return<div style={{...s,background:el.src?"transparent":el.fill||"rgba(0,0,0,0.08)",borderRadius:6,overflow:"hidden"}}>{el.src&&<img src={el.src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}</div>;
  if(el.type==="shape")return<div style={{...s,background:el.fill||"#1A3A6B",borderRadius:el.content==="ellipse"?"50%":8}}/>;
  if(el.type==="qr")return<div style={{...s,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"2px solid #ddd"}}>{qrValue?<QRCodeSVG value={qrValue} size={Math.max(24,Math.min(el.w,el.h)-16)} bgColor="#fff" fgColor="#0B1629" level="M"/>:<span style={{fontSize:11,color:"#888"}}>QR</span>}</div>;
  return null;
}
const tb:React.CSSProperties={display:"flex",alignItems:"center",gap:4,padding:"6px 10px",border:"1px solid #e0e0e0",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#444"};
const fb:React.CSSProperties={display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 10px",width:56,background:"#fff",border:"1px solid #e0e0e0",borderRadius:8,cursor:"pointer",color:"#555",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"};
function Editor(){
  const params=useParams();
  const router=useRouter();
  const sp=useSearchParams();
  const pid=params?.productId as string;
  const product=PRODUCTS.find(p=>p.id===pid);
  const slug=product?.slug||"";
  const tmpl=DT[slug]||DFL;
  const[pages,setPages]=useState<Page[]>(()=>mkPages(slug,tmpl));
  const[ci,setCi]=useState(0);
  const[sel,setSel]=useState<string|null>(null);
  const[tab,setTab]=useState<Tab>("images");
  const[hist,setHist]=useState<Page[][]>([]);
  const[fut,setFut]=useState<Page[][]>([]);
  const fref=useRef<HTMLInputElement>(null);
  const[uploads,setUploads]=useState<string[]>([]);
  const[draftId,setDraftId]=useState<string|null>(null);
  const[saveMsg,setSaveMsg]=useState<string|null>(null);
  const[preview,setPreview]=useState(false);
  const[origin,setOrigin]=useState<string|null>(null);
  const createdAt=useRef<string|null>(null);
  const preDrag=useRef<Page[]|null>(null);
  const loaded=useRef(false);
  const pg=pages[ci];
  const qrValue=origin&&draftId?`${origin}/memory/${draftId}`:origin?`${origin}/memory/preview`:null;
  // Hydrate origin + any existing draft (?draft=...) after mount, off the effect's sync path.
  useEffect(()=>{
    if(loaded.current)return;
    loaded.current=true;
    const d=sp?.get("draft");
    let alive=true;
    queueMicrotask(()=>{
      if(!alive)return;
      setOrigin(window.location.origin);
      if(!d)return;
      const draft=loadDraft(d);
      if(draft&&draft.productId===pid){
        setPages(draft.pages);
        setDraftId(draft.id);
        createdAt.current=draft.createdAt;
      }
    });
    return()=>{alive=false;};
  },[sp,pid]);
  const push=useCallback((next:Page[])=>{setHist(h=>[...h.slice(-20),pages]);setFut([]);setPages(next);},[pages]);
  const undo=()=>{if(!hist.length)return;const p=hist[hist.length-1];setFut(f=>[pages,...f]);setHist(h=>h.slice(0,-1));setPages(p);setSel(null);};
  const redo=()=>{if(!fut.length)return;const n=fut[0];setHist(h=>[...h,pages]);setFut(f=>f.slice(1));setPages(n);setSel(null);};
  const addEl=(type:El["type"],extra:Partial<El>={})=>{const el=mkEl(type,extra);push(pages.map((p,i)=>i===ci?{...p,elements:[...p.elements,el]}:p));setSel(el.id);};
  const moveEl=(id:string,x:number,y:number)=>setPages(pages.map((p,i)=>i===ci?{...p,elements:p.elements.map(e=>e.id===id?{...e,x:Math.max(0,x),y:Math.max(0,y)}:e)}:p));
  const moveStart=()=>{preDrag.current=pages;};
  const moveEnd=()=>{const before=preDrag.current;preDrag.current=null;if(before&&before!==pages){setHist(h=>[...h.slice(-20),before]);setFut([]);}};
  const dropImg=(id:string,src:string)=>push(pages.map((p,i)=>i===ci?{...p,elements:p.elements.map(e=>e.id===id?{...e,src}:e)}:p));
  const delSel=()=>{if(!sel)return;push(pages.map((p,i)=>i===ci?{...p,elements:p.elements.filter(e=>e.id!==sel)}:p));setSel(null);};
  const setBg=(bg:string)=>push(pages.map((p,i)=>i===ci?{...p,bg}:p));
  const nextPageNo=()=>(pages.length-1)*2;
  const addPage=()=>{const n=nextPageNo();push([...pages,{id:uid(),label:`Page ${n}–${n+1}`,elements:[mkEl("image",{x:20,y:30,w:300,h:200})],bg:"#fff"}]);setCi(pages.length);};
  const duplicatePage=()=>{
    const src=pages[ci];
    const copy:Page={...src,id:uid(),label:ci===0?`Page ${nextPageNo()}–${nextPageNo()+1}`:`${src.label} (copy)`,elements:src.elements.map(e=>({...e,id:uid()}))};
    const at=ci===0?pages.length:ci+1;
    push([...pages.slice(0,at),copy,...pages.slice(at)]);
    setCi(at);setSel(null);
  };
  const removePage=()=>{
    if(sel){delSel();return;}
    if(ci===0||pages.length<=2)return;
    push(pages.filter((_,i)=>i!==ci));
    setCi(c=>Math.max(0,c-1));
  };
  const handleFile=(e:React.ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=ev=>{setUploads(u=>[ev.target?.result as string,...u]);};r.readAsDataURL(f);e.target.value="";};
  const doSave=useCallback((silent:boolean):string|null=>{
    const id=draftId??nanoid(10);
    const now=new Date().toISOString();
    if(!createdAt.current)createdAt.current=now;
    const res=saveDraft({id,productId:pid,title:product?.title||"My Photobook",pages,createdAt:createdAt.current,updatedAt:now});
    if(res.ok){
      setDraftId(id);
      if(!silent){setSaveMsg(res.stripped?"Saved — photos were too large to store":"Saved ✓");setTimeout(()=>setSaveMsg(null),2500);}
      return id;
    }
    setSaveMsg("Couldn't save — browser storage is full");
    setTimeout(()=>setSaveMsg(null),3000);
    return null;
  },[draftId,pages,pid,product]);
  // Autosave once a draft exists
  useEffect(()=>{
    if(!draftId)return;
    const t=setTimeout(()=>{doSave(true);},1200);
    return()=>clearTimeout(t);
  },[pages,draftId,doSave]);
  const order=()=>{
    const id=doSave(true);
    router.push(id?`/checkout?draft=${id}`:`/checkout?product=${pid}`);
  };
  const price=formatPrice((product?.basePrice||29.99)+9.99);
  const ST=[{I:Type,l:"Text",a:()=>addEl("text")},{I:II,l:"Photo",a:()=>addEl("image")},{I:QrCode,l:"QR Code",a:()=>addEl("qr",{w:110,h:110})},{I:Layout,l:"Layout",a:()=>setTab("layouts")},{I:Square,l:"Rectangle",a:()=>addEl("shape",{fill:"#1A3A6B",w:180,h:120,content:"rect"})},{I:Circle,l:"Ellipse",a:()=>addEl("shape",{fill:"#C4973A",w:130,h:130,content:"ellipse"})}];

  // Keyboard support for deleting elements
  useEffect(()=>{
    const handleKey=(e:KeyboardEvent)=>{
      const tag=(e.target as HTMLElement).tagName;
      if((e.key==="Delete"||e.key==="Backspace")&&sel&&tag!=="INPUT"&&tag!=="TEXTAREA"){
        delSel();
      }
    };
    window.addEventListener("keydown",handleKey);
    return ()=>window.removeEventListener("keydown",handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sel,pages,ci]);

  if(!product)return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,background:"#F0F2F5",fontFamily:"Inter,sans-serif"}}>
      <p style={{fontSize:18,color:"#555"}}>This photobook doesn&apos;t exist.</p>
      <Link href="/collections/all" style={{background:"#1A3A6B",color:"#fff",padding:"10px 20px",borderRadius:8,textDecoration:"none",fontWeight:600,fontSize:14}}>Browse Collections</Link>
    </div>
  );

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#F0F2F5",fontFamily:"Inter,sans-serif",overflow:"hidden"}}>
      <div style={{height:52,background:"#fff",borderBottom:"1px solid #e0e0e0",display:"flex",alignItems:"center",padding:"0 16px",gap:10,flexShrink:0,zIndex:10}}>
        <Link href="/collections/all" style={{display:"flex",alignItems:"center",gap:4,color:"#555",textDecoration:"none",fontSize:13,fontWeight:500}}><ChevronLeft size={15}/>Back</Link>
        <div style={{width:1,height:24,background:"#e0e0e0"}}/>
        <span style={{fontSize:14,fontWeight:600,color:"#222",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{product.title}</span>
        {saveMsg&&<span style={{fontSize:12,fontWeight:600,color:saveMsg.startsWith("Saved")?"#2E7D32":"#c62828"}}>{saveMsg}</span>}
        <button onClick={undo} disabled={!hist.length} style={{...tb,opacity:hist.length?1:0.4}} aria-label="Undo"><Undo2 size={15}/></button>
        <button onClick={redo} disabled={!fut.length} style={{...tb,opacity:fut.length?1:0.4}} aria-label="Redo"><Redo2 size={15}/></button>
        <button onClick={()=>setPreview(true)} style={{...tb,fontSize:13}}><Eye size={14}/>Preview</button>
        <button onClick={()=>doSave(false)} style={{...tb,fontSize:13}}><Save size={14}/>Save</button>
        <button onClick={order} style={{display:"flex",alignItems:"center",gap:6,background:"#C4973A",color:"#0B1629",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}><ShoppingCart size={14}/>Order {price}</button>
      </div>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{width:60,background:"#fff",borderRight:"1px solid #e0e0e0",display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 0",flexShrink:0}}>
          {(["images","templates","layouts","backgrounds","stickers"] as Tab[]).map(t=>{
            const ico:Record<Tab,React.ReactNode>={images:<II size={18}/>,templates:<Layout size={18}/>,layouts:<span style={{fontSize:16}}>🔲</span>,backgrounds:<Square size={18}/>,stickers:<span style={{fontSize:16}}>✨</span>};
            return<button key={t} onClick={()=>setTab(t)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 4px",border:"none",cursor:"pointer",width:"100%",background:tab===t?"#EFF3FF":"transparent",color:tab===t?"#1A3A6B":"#666"}}>{ico[t]}<span style={{fontSize:8,fontWeight:600,textTransform:"uppercase"}}>{t.slice(0,4)}</span></button>;
          })}
        </div>
        <div style={{width:220,background:"#fff",borderRight:"1px solid #e0e0e0",overflowY:"auto",flexShrink:0,padding:14}}>
          {tab==="images"&&<>
            <p style={{fontSize:13,fontWeight:700,color:"#222",marginBottom:12}}>Choose source to<br/><span style={{color:"#1A3A6B"}}>Add photos</span></p>
            <input ref={fref} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleFile}/>
            <button onClick={()=>fref.current?.click()} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",border:"1px solid #e0e0e0",borderRadius:8,background:"#fff",cursor:"pointer",marginBottom:8,fontSize:13,color:"#333",fontWeight:500}}><Monitor size={16}/>Upload from computer</button>
            {uploads.length===0&&<><div style={{textAlign:"center",color:"#aaa",fontSize:12,margin:"10px 0"}}>or</div>
              <div onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();readImageDrop(e).then(src=>{if(src)setUploads(u=>[src,...u]);});}} style={{border:"2px dashed #ddd",borderRadius:8,padding:"18px 12px",textAlign:"center",color:"#aaa",fontSize:12}}><div style={{fontSize:24,marginBottom:6}}>📂</div>Drag & drop</div></>}
            {uploads.length>0&&<div style={{marginTop:16}}>
              <p style={{fontSize:11,fontWeight:700,color:"#888",marginBottom:8,textTransform:"uppercase"}}>Uploaded — click or drag onto a page</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {uploads.map((u,i)=><div key={i} draggable onDragStart={e=>e.dataTransfer.setData("text/plain",u)} onClick={()=>addEl("image",{src:u,w:220,h:160})} style={{aspectRatio:"1",background:`url(${u}) center/cover`,borderRadius:8,cursor:"pointer",border:"1px solid #eee"}}/>)}
              </div>
            </div>}
          </>}
          {tab==="templates"&&<>
            <p style={{fontSize:11,fontWeight:700,color:"#888",marginBottom:12,textTransform:"uppercase"}}>Destination Templates</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {Object.entries(DT).map(([s,t])=>(
                <button key={s} onClick={()=>setBg(t.bg)} style={{border:"2px solid #eee",borderRadius:8,overflow:"hidden",cursor:"pointer",padding:0,height:65,background:t.bg,display:"flex",alignItems:"flex-end"}}>
                  <span style={{padding:"4px 6px",fontSize:8,fontWeight:700,color:t.ac,textTransform:"uppercase"}}>{t.lbl}</span>
                </button>
              ))}
            </div>
          </>}
          {tab==="backgrounds"&&<>
            <p style={{fontSize:11,fontWeight:700,color:"#888",marginBottom:12,textTransform:"uppercase"}}>Backgrounds</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {BGS.map(b=><button key={b} onClick={()=>setBg(b)} style={{aspectRatio:"1",borderRadius:8,border:pg.bg===b?"2px solid #C4973A":"2px solid transparent",background:b,cursor:"pointer"}}/>)}
            </div>
          </>}
          {tab==="stickers"&&<>
            <p style={{fontSize:11,fontWeight:700,color:"#888",marginBottom:12,textTransform:"uppercase"}}>Stickers</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {STKS.map(s=><button key={s} onClick={()=>addEl("text",{content:s,fontSize:32,w:50,h:50,fill:"transparent"})} style={{fontSize:22,padding:6,border:"1px solid #eee",borderRadius:8,cursor:"pointer",background:"#fff"}}>{s}</button>)}
            </div>
          </>}
          {tab==="layouts"&&<>
            <p style={{fontSize:11,fontWeight:700,color:"#888",marginBottom:12,textTransform:"uppercase"}}>Photo Layouts</p>
            {[{n:"1 Photo",c:1,r:1},{n:"2 Photos",c:2,r:1},{n:"3 Photos",c:3,r:1},{n:"4 Photos",c:2,r:2},{n:"6 Photos",c:2,r:3}].map(l=>(
              <button key={l.n} onClick={()=>{
                const cw=Math.floor(296/l.c)-6,rh=Math.floor(360/l.r)-6,els:El[]=[];
                for(let row=0;row<l.r;row++)for(let col=0;col<l.c;col++)els.push(mkEl("image",{x:10+col*(cw+6),y:10+row*(rh+6),w:cw,h:rh}));
                // Keep any photos already placed on the page: refill the new slots in order
                const photos=pg.elements.filter(e=>e.type==="image"&&e.src).map(e=>e.src as string);
                els.forEach((e,i)=>{if(photos[i])e.src=photos[i];});
                push(pages.map((p,i)=>i===ci?{...p,elements:els}:p));
              }} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",border:"1px solid #eee",borderRadius:8,background:"#fff",cursor:"pointer",marginBottom:8,fontSize:13,color:"#333"}}>
                <div style={{display:"grid",gridTemplateColumns:`repeat(${l.c},1fr)`,gap:2,width:40,height:30}}>{Array(l.c*l.r).fill(0).map((_,i)=><div key={i} style={{background:"#ddd",borderRadius:2}}/>)}</div>
                {l.n}
              </button>
            ))}
          </>}
        </div>
        <div style={{flex:1,overflow:"auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 0 120px",position:"relative"}} onClick={()=>setSel(null)}>
          <div style={{position:"fixed",left:288,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:4,zIndex:20}}>
            {ST.map(t=><button key={t.l} onClick={t.a} style={fb}><t.I size={16}/><span style={{fontSize:9}}>{t.l}</span></button>)}
            {sel&&<button onClick={delSel} style={{...fb,color:"#e53935"}}><Trash2 size={16}/><span style={{fontSize:9}}>Delete</span></button>}
          </div>
          <div style={{display:"flex",gap:0,boxShadow:"0 8px 48px rgba(0,0,0,0.18)",borderRadius:4}}>
            <div style={{width:340,minHeight:480,background:ci===0?tmpl.bg:pg.bg,position:"relative",borderRadius:"4px 0 0 4px",overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
              <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",fontSize:10,color:"rgba(0,0,0,0.3)",letterSpacing:".1em",pointerEvents:"none"}}>{ci===0?"Back cover":"Left page"}</div>
              {ci===0
                ?<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:0.2,fontSize:14,color:tmpl.ac}}>Back cover</div>
                :pg.elements.map(el=><DragEl key={el.id} el={el} sel={sel===el.id} onSel={setSel} onMove={moveEl} onDrop={dropImg} onMoveStart={moveStart} onMoveEnd={moveEnd} qrValue={qrValue}/>)
              }
            </div>

            {/* Real Book Spine */}
            {ci===0
              ? <div style={{width:24,background:tmpl.bg,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",borderLeft:"1.5px solid rgba(0,0,0,0.15)",borderRight:"1.5px solid rgba(0,0,0,0.15)",position:"relative",zIndex:5,boxShadow:"inset 4px 0 8px rgba(0,0,0,0.06), inset -4px 0 8px rgba(255,255,255,0.2)"}}>
                  <div style={{transform:"rotate(-90deg)",whiteSpace:"nowrap",fontSize:9,fontWeight:700,letterSpacing:3,color:tmpl.ac,opacity:0.8}}>{tmpl.lbl}</div>
                </div>
              : <div style={{width:2,background:"#ddd",boxShadow:"0 0 12px rgba(0,0,0,0.1)",flexShrink:0}}/>
            }

            <div style={{width:340,minHeight:480,background:pg.bg,position:"relative",borderRadius:"0 4px 4px 0",overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
              <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",fontSize:10,color:"rgba(0,0,0,0.3)",letterSpacing:".1em",pointerEvents:"none"}}>{ci===0?"Front cover":"Right page"}</div>
              {pg.elements.map(el=><DragEl key={el.id} el={el} sel={sel===el.id} onSel={setSel} onMove={moveEl} onDrop={dropImg} onMoveStart={moveStart} onMoveEnd={moveEnd} qrValue={qrValue}/>)}
            </div>
          </div>
          <div style={{position:"fixed",right:16,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:4,zIndex:20}}>
            {ST.map(t=><button key={t.l} onClick={t.a} style={fb}><t.I size={16}/><span style={{fontSize:9}}>{t.l}</span></button>)}
          </div>
        </div>
      </div>
      <div style={{height:130,background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",alignItems:"center",gap:10,padding:"0 16px",overflowX:"auto",flexShrink:0,zIndex:10}}>
        {pages.map((p,i)=>(
          <button key={p.id} onClick={()=>{setCi(i);setSel(null);}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:6,border:"none",background:"transparent",cursor:"pointer",flexShrink:0}}>
            <div style={{width:80,height:58,background:p.bg,borderRadius:4,border:i===ci?"2.5px solid #C4973A":"2px solid #ddd",position:"relative",overflow:"hidden"}}>
              {i===0&&<div style={{position:"absolute",inset:0,background:tmpl.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:900,color:tmpl.ac}}>{tmpl.lbl}</div>}
            </div>
            <span style={{fontSize:10,color:i===ci?"#C4973A":"#888",fontWeight:i===ci?700:400}}>{p.label}</span>
          </button>
        ))}
        <button onClick={addPage} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:6,border:"none",background:"transparent",cursor:"pointer",flexShrink:0}}>
          <div style={{width:80,height:58,border:"2px dashed #ddd",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",color:"#aaa"}}><Plus size={18}/></div>
          <span style={{fontSize:10,color:"#aaa"}}>Add</span>
        </button>
        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <button onClick={duplicatePage} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,padding:"6px 12px",background:"#F0F2F5",border:"1px solid #ddd",borderRadius:8,cursor:"pointer",color:"#555"}}><Copy size={13}/>Duplicate page</button>
          <button onClick={removePage} style={{fontSize:12,padding:"6px 12px",background:"#FFF0F0",border:"1px solid #ffcdd2",borderRadius:8,cursor:"pointer",color:"#c62828"}}>{sel?"Remove element":"Remove page"}</button>
        </div>
      </div>

      {/* Preview modal */}
      {preview&&(
        <div style={{position:"fixed",inset:0,background:"rgba(11,22,41,0.92)",zIndex:100,display:"flex",flexDirection:"column"}} onClick={()=>setPreview(false)}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 24px",flexShrink:0}}>
            <span style={{color:"#fff",fontWeight:700,fontSize:16,fontFamily:"'Playfair Display',serif"}}>{product.title} — Preview</span>
            <button onClick={()=>setPreview(false)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:8,cursor:"pointer",color:"#fff",display:"flex"}} aria-label="Close preview"><X size={18}/></button>
          </div>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexWrap:"wrap",gap:28,justifyContent:"center",alignContent:"flex-start",padding:"12px 24px 48px"}} onClick={e=>e.stopPropagation()}>
            {pages.map(p=>(
              <div key={p.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <div style={{width:340,height:480,background:p.bg,position:"relative",borderRadius:6,overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,0.5)"}}>
                  {p.elements.map(el=><StaticEl key={el.id} el={el} qrValue={qrValue}/>)}
                </div>
                <span style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontWeight:600}}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default function EditorPage(){
  return(
    <Suspense fallback={<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F0F2F5",color:"#888",fontFamily:"Inter,sans-serif"}}>Loading editor…</div>}>
      <Editor/>
    </Suspense>
  );
}
