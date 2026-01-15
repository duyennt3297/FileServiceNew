import svgPaths from "./svg-qgw3m0em2i";
import imgEllipse3 from "figma:asset/14b6e09bbbce88048c49e0eb0b484cadeab01689.png";

function Bars() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="bars">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="bars">
          <path d="M3 12H21M3 6H21M3 18H21" id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ImageCouppa() {
  return (
    <div className="h-[32px] relative shrink-0 w-[117.7px]" data-name="Image (Couppa)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src="8820bc7bbf0d02b7bdd21899b22ceae201565e22.png" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] grow items-center min-h-px min-w-px relative shrink-0">
      <Bars />
      <ImageCouppa />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[0_-3.75%_-3.75%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 20.75">
          <g id="Group 12">
            <path d="M15.5556 15.5556L20 20" id="Vector 22" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <circle cx="9.44444" cy="9.44444" id="Ellipse 50" r="8.69444" stroke="var(--stroke-0, #101828)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="search">
      <Group />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#f2f4f7] content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[6px] relative rounded-[20px] shrink-0 w-[320px]">
      <Search />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[14px]">Tìm kiếm nhanh</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">Ctrl S</p>
    </div>
  );
}

function Home() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="home">
          <path d={svgPaths.p996d900} id="Vector 72" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <Home />
    </div>
  );
}

function Bell() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="bell">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="bell">
          <path d={svgPaths.p2fb08800} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#d11313] content-stretch flex flex-col items-center justify-center left-[20px] px-[4px] py-[2px] rounded-[10px] top-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">8</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start p-[8px] relative shrink-0">
      <Bell />
      <Frame />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame2 />
      <Frame1 />
      <div className="relative shrink-0 size-[36px]">
        <img alt="" className="block max-w-none size-full" height="36" src={imgEllipse3} width="36" />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame3 />
      <Frame6 />
    </div>
  );
}

export default function NavigationTemplate() {
  return (
    <div className="bg-white content-stretch flex items-center px-[24px] py-[10px] relative size-full" data-name="Navigation-template">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      <Frame5 />
      <Frame4 />
    </div>
  );
}