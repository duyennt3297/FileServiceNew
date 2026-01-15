import svgPaths from "./svg-n310njmeiz";
import imgImageCouppa from "figma:asset/3aee2d7b23123d58c14375be396e2bd3a9b22ada.png";
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
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageCouppa} />
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

function Frame7() {
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
      <Frame7 />
    </div>
  );
}

function NavigationTemplate() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Navigation-template">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[10px] relative w-full">
          <Frame5 />
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Speedometer() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="speedometer">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="speedometer">
          <path d="M16.4999 7.5L11.9999 12" id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <circle cx="12" cy="12" id="Ellipse 29" r="1.25" stroke="var(--stroke-0, #98A2B3)" strokeWidth="1.5" />
          <circle cx="12" cy="12" id="Ellipse 49" r="9.25" stroke="var(--stroke-0, #98A2B3)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <Speedometer />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClipboardCheck() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="clipboard-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="clipboard-check">
          <path d={svgPaths.p323ed580} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar1() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <ClipboardCheck />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Order</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Package() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="package">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="package">
          <path d={svgPaths.p3186c400} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16.5 9.5L7.5 4.5" id="Icon_2" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar2() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <Package />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertTriangle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="alert-triangle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="alert-triangle">
          <path d={svgPaths.p968f180} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar3() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <AlertTriangle />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Complaints</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrencyDollarCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="currency-dollar-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="currency-dollar-circle">
          <path d={svgPaths.p1d80b700} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar4() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <CurrencyDollarCircle />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="help-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="help-circle">
          <path d={svgPaths.p2e3b7e00} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1fe04000} id="Icon_2" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar5() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <HelpCircle />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">FQA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PieChart() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pie-chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pie-chart">
          <path d={svgPaths.p1c262b00} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar6() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <PieChart />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Report</p>
          </div>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function OneSideBar7() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Sale</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneSideBar8() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneSideBar9() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneSideBar10() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Setting() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="setting">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="setting">
          <g id="Icon">
            <path d={svgPaths.p3cccb600} stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.pf152080} stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar11() {
  return (
    <div className="relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <Setting />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Setting</p>
          </div>
          <ChevronDown1 />
        </div>
      </div>
    </div>
  );
}

function OneSideBar12() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneSideBar13() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Role</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneSideBar14() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Category</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneSideBar15() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Bitel Decoration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Newspaper() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="newspaper">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="newspaper">
          <g id="Group 38121">
            <path d={svgPaths.p282acc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1fc89b00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <path d="M6.99414 8.00488H13.073" id="Vector 125" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M6.99414 12H13.073" id="Vector 126" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M6.99414 15.9951H13.073" id="Vector 127" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function OneSideBar16() {
  return (
    <div className="bg-[#e50914] relative rounded-[8px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
          <Newspaper />
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">
            <p className="leading-[21px]">Nội dung</p>
          </div>
          <ChevronDown2 />
        </div>
      </div>
    </div>
  );
}

function OneSideBar17() {
  return (
    <div className="bg-white h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ef4444] text-[14px]">
            <p className="leading-[21px]">Video</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneSideBar18() {
  return (
    <div className="h-[32px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-full" data-name="One side bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[44px] pr-[12px] py-[8px] relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Tin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideBarTemplate() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[4px] h-[1020px] items-start p-[16px] relative shrink-0 w-[288px]" data-name="side bar-template">
      <OneSideBar />
      <OneSideBar1 />
      <OneSideBar2 />
      <OneSideBar3 />
      <OneSideBar4 />
      <OneSideBar5 />
      <OneSideBar6 />
      <OneSideBar7 />
      <OneSideBar8 />
      <OneSideBar9 />
      <OneSideBar10 />
      <OneSideBar11 />
      <OneSideBar12 />
      <OneSideBar13 />
      <OneSideBar14 />
      <OneSideBar15 />
      <OneSideBar16 />
      <OneSideBar17 />
      <OneSideBar18 />
    </div>
  );
}

function BreadcrumbButtonBase() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Breadcrumb button base">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">Trang chủ</p>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-right">
          <path d="M7.5 15L12.5 10L7.5 5" id="Icon" stroke="var(--stroke-0, #D0D5DD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BreadcrumbButtonBase1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Breadcrumb button base">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">Nội dung</p>
    </div>
  );
}

function BreadcrumbButtonBase2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Breadcrumb button base">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Video</p>
    </div>
  );
}

function BreadcrumbButtonBase3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Breadcrumb button base">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Chi tiết video</p>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Breadcrumbs">
      <BreadcrumbButtonBase />
      <ChevronRight />
      <BreadcrumbButtonBase1 />
      <ChevronRight />
      <BreadcrumbButtonBase2 />
      <ChevronRight />
      <BreadcrumbButtonBase3 />
    </div>
  );
}

function Frame21() {
  return <div className="bg-black h-full rounded-[16px] shrink-0 w-[653px]" />;
}

function Label() {
  return (
    <div className="content-stretch flex h-[19px] items-start relative shrink-0 w-[46.797px]" data-name="Label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-nowrap">Tiêu đề</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#101828] text-[18px] text-nowrap top-[-1px]">Combo xu đặc biệt tháng 12</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[596px]">
      <Label />
      <Paragraph />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex h-[19px] items-start relative shrink-0 w-[69.891px]" data-name="Label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-nowrap">Ngày đăng</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-2px]">01/01/2025 18:39</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 top-[3px] w-[290px]">
      <Label1 />
      <Paragraph1 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[56px] relative shrink-0 w-[382px]" data-name="Container">
      <Frame12 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex h-[19px] items-start relative shrink-0 w-[63.703px]" data-name="Label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-nowrap">Trạng thái</p>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[#dcfce7] h-[28px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Text">
      <div className="content-stretch flex items-start px-[12px] py-[4px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-nowrap">Đã đăng</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[76.313px]">
      <Label2 />
      <Text />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0">
      <Container />
      <Frame13 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] gap-[71px] items-center leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] w-full">
      <p className="relative shrink-0 w-[103px]">Giá: 20,000đ</p>
      <p className="relative shrink-0 w-[117px]">HSD: 01/12/2025</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[19px] items-center relative shrink-0">
      <p className="relative shrink-0 text-[#4a5565]">Còn lại:</p>
      <p className="relative shrink-0 text-[#00a63e]">150</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <p className="relative shrink-0 text-[#4a5565]">Lượt click:</p>
      <p className="relative shrink-0 text-[#e7000b]">{` 65`}</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex font-['Arimo:Regular',sans-serif] gap-[17px] items-center leading-[20px] relative shrink-0 text-[14px] text-nowrap">
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col font-normal gap-[8px] items-start p-[8px] relative w-full">
        <p className="font-['Inter:Regular',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#101828] text-[16px] w-[min-content]">Giảm 50K cho đơn từ 200K</p>
        <Frame15 />
        <Frame20 />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] gap-[71px] items-center leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] w-full">
      <p className="relative shrink-0 w-[103px]">Giá: 20,000đ</p>
      <p className="relative shrink-0 w-[117px]">HSD: 01/12/2025</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[19px] items-center relative shrink-0">
      <p className="relative shrink-0 text-[#4a5565]">Còn lại:</p>
      <p className="relative shrink-0 text-[#00a63e]">150</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <p className="relative shrink-0 text-[#4a5565]">Lượt click:</p>
      <p className="relative shrink-0 text-[#e7000b]">{` 45`}</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex font-['Arimo:Regular',sans-serif] gap-[17px] items-center leading-[20px] relative shrink-0 text-[14px] text-nowrap">
      <Frame28 />
      <Frame29 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col font-normal gap-[8px] items-start p-[8px] relative w-full">
        <p className="font-['Inter:Regular',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#101828] text-[16px] w-[min-content]">Giảm 30% cho đơn từ 200K</p>
        <Frame24 />
        <Frame30 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[780px]">
      <Frame11 />
      <Frame19 />
      <Frame16 />
      <Frame31 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame21 />
      </div>
      <Frame14 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[12px] items-start pl-0 pr-[8px] py-0 relative w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[#101828] text-[20px] text-nowrap">Chi tiết video</p>
        <Frame22 />
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[#0a0a0a] text-[18px] text-nowrap">Thống kê hiệu suất</p>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">Toàn thời gian</p>
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[12px] py-[6px] relative w-full">
          <Content />
          <ChevronDown3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Input />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-end justify-end relative shrink-0 w-[159px]">
      <Frame23 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-[72px] relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[1236px] items-center px-[8px] py-0 relative size-full">
          <Frame25 />
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#1447e6] text-[14px]">Lượt xem</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#1c398e] text-[24px]">2.800</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#155dfc] text-[12px]">{`Video phát > 3 giây`}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(161.792deg, rgb(239, 246, 255) 0%, rgb(219, 234, 254) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative size-full">
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-[196.406px]" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#c6005c] text-[14px]">Lượt thích</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-[196.406px]" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#861043] text-[24px]">185</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(161.792deg, rgb(253, 242, 248) 0%, rgb(252, 231, 243) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#fccee8] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#008236] text-[14px]">Click coupon</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#0d542b] text-[24px]">110</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[0.2px] not-italic text-[#00a63e] text-[12px] top-[-1px] w-[71px]">CTR: 3.93%</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Container8 />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(161.792deg, rgb(240, 253, 244) 0%, rgb(220, 252, 231) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#8200db] text-[14px]">Follow shop</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#59168b] text-[24px]">30</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#9810fa] text-[12px]">Từ video này</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Container12 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(161.792deg, rgb(250, 245, 255) 0%, rgb(243, 232, 255) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <Frame38 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#ca3500] text-[14px]">Thời gian xem</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[0.41px] not-italic text-[#7e2a0c] text-[24px] top-[-2px] w-[92px]">7:00:32</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container18() {
  return <div className="h-[16px] shrink-0 w-full" data-name="Container" />;
}

function Container19() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(161.792deg, rgb(255, 247, 237) 0%, rgb(255, 237, 212) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#ffd6a7] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center p-[16px] relative size-full">
          <Frame39 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow h-full items-center justify-center min-h-px min-w-px relative shrink-0">
      <Container4 />
      <Container7 />
      <Container11 />
      <Container15 />
      <Container19 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex h-[100px] items-center relative shrink-0 w-full">
      <Frame35 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[72px] relative rounded-[8px] shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[18px] w-[273px]">Biểu đồ diễn biến</p>
      </div>
    </div>
  );
}

function KeyItem() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(0, 199, 242, 1)", "--stroke-0": "rgba(0, 122, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #00C7F2)" id="Ellipse 13" r="4.5" stroke="var(--stroke-0, #007AFF)" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap">Lượt xem</p>
    </div>
  );
}

function KeyItem1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #F75D5F)" id="Ellipse 13" r="5" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap">Lượt thích</p>
    </div>
  );
}

function KeyItem2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #0FCA7A)" id="Ellipse 13" r="5" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap">Click coupon</p>
    </div>
  );
}

function KeyItem3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #695CFB)" id="Ellipse 13" r="5" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap">Follow shop</p>
    </div>
  );
}

function KeyItem4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #F7A23B)" id="Ellipse 13" r="5" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap">Thời gian xem</p>
    </div>
  );
}

function StatusHorizontal() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="status/horizontal">
      <KeyItem />
      <KeyItem1 />
      <KeyItem2 />
      <KeyItem3 />
      <KeyItem4 />
    </div>
  );
}

function Row() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">1000</p>
    </div>
  );
}

function Row1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">750</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505 1">
            <path d="M0 0.5H1505" id="Vector" stroke="var(--stroke-0, #E7EAEE)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">500</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505 1">
            <path d="M0 0.5H1505" id="Vector" stroke="var(--stroke-0, #E7EAEE)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">250</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505 1">
            <path d="M0 0.5H1505" id="Vector" stroke="var(--stroke-0, #E7EAEE)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex h-[35.4px] items-center relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">0</p>
    </div>
  );
}

function YAxis() {
  return (
    <div className="content-stretch flex flex-col h-[227px] items-start relative shrink-0 w-full" data-name="y-axis">
      <Row />
      <Row1 />
      {[...Array(3).keys()].map((_, i) => (
        <Row2 key={i} />
      ))}
      <Row3 />
      <Row4 />
    </div>
  );
}

function Column() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[199px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[199px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <line id="Line 1" opacity="0" stroke="var(--stroke-0, #E7EAEE)" x2="199" y1="-0.5" y2="-0.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">01/12/25</p>
    </div>
  );
}

function Column1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[196px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E7EAEE)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#72777b] text-[12px] text-nowrap w-full">02/12/25</p>
    </div>
  );
}

function Column2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[196px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E7EAEE)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">03/12/25</p>
    </div>
  );
}

function Column3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[196px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E7EAEE)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">04/12/25</p>
    </div>
  );
}

function Column4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[196px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E7EAEE)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">05/12/25</p>
    </div>
  );
}

function Column5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[196px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E7EAEE)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">06/12/25</p>
    </div>
  );
}

function Column6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[196px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E7EAEE)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">07/12/25</p>
    </div>
  );
}

function XAxis() {
  return (
    <div className="absolute content-stretch flex inset-0 items-end" data-name="x-axis">
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
      <Column4 />
      <Column5 />
      <Column6 />
    </div>
  );
}

function DataLines() {
  return (
    <div className="absolute contents inset-[11.85%_0_7.11%_0]" data-name="Data Lines">
      <div className="absolute flex inset-[11.85%_0_7.11%_0] items-center justify-center">
        <div className="flex-none h-[171px] scale-y-[-100%] w-[1505px]">
          <div className="relative size-full" data-name="🟠 Orange">
            <div className="absolute inset-[-0.54%_0_-0.48%_-0.02%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505.32 172.746">
                <path d={svgPaths.p31a99a80} id="ð  Orange" stroke="var(--stroke-0, #695CFB)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[15.64%_0_12.32%_0] items-center justify-center">
        <div className="flex-none h-[152px] scale-y-[-100%] w-[1505px]">
          <div className="relative size-full" data-name="🔵 Blue">
            <div className="absolute inset-[-0.46%_-0.02%_-0.58%_-0.01%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505.45 153.578">
                <path d={svgPaths.p35677700} id="ðµ Blue" stroke="var(--stroke-0, #00C7F2)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[11.85%_0_19.43%_0] items-center justify-center">
        <div className="flex-none h-[145px] scale-y-[-100%] w-[1505px]">
          <div className="relative size-full" data-name="🔴 Red">
            <div className="absolute inset-[-0.55%_-0.01%_-0.58%_-0.02%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505.4 146.645">
                <path d={svgPaths.p241a080} id="ð´ Red" stroke="var(--stroke-0, #F75D5F)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[12.8%_0_19.43%_0] items-center justify-center">
        <div className="flex-none h-[143px] scale-y-[-100%] w-[1505px]">
          <div className="relative size-full" data-name="🟢 Green">
            <div className="absolute inset-[-0.55%_-0.01%_-0.53%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505.11 144.555">
                <path d={svgPaths.p64dc280} id="ð¢ Green" stroke="var(--stroke-0, #0FCA7A)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[12.32%_0_12.8%_0] items-center justify-center">
        <div className="flex-none h-[158px] scale-y-[-100%] w-[1505px]">
          <div className="relative size-full" data-name="🟡 Yellow">
            <div className="absolute inset-[-0.48%_-0.01%_-0.48%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1505.14 159.514">
                <path d={svgPaths.p280c0980} id="ð¡ Yellow" stroke="var(--stroke-0, #FBC62F)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function XAxisContainer() {
  return (
    <div className="absolute h-[211px] left-[47px] right-0 top-[15px]" data-name="X-axis Container">
      <div className="absolute border border-[#e7eaee] border-solid h-[196px] left-0 right-0 top-0" data-name="Outline" />
      <XAxis />
      <DataLines />
    </div>
  );
}

function Graph() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Graph">
      <YAxis />
      <XAxisContainer />
      <div className="absolute flex h-[51px] items-center justify-center left-[-4px] top-[87px] translate-x-[-50%] w-[14px]" style={{ "--transform-inner-width": "53.9375", "--transform-inner-height": "13.328125" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative text-[#2d2d2d] text-[12px] text-center text-nowrap tracking-[0.5px]">Số lượng</p>
        </div>
      </div>
    </div>
  );
}

function GraphContainer() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Graph container">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[40px] pt-[16px] px-[16px] relative w-full">
        <StatusHorizontal />
        <Graph />
        <p className="absolute bottom-[28px] font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%+23.5px)] not-italic text-[#2d2d2d] text-[12px] text-center text-nowrap tracking-[0.5px] translate-x-[-50%] translate-y-[100%]">Thời gian</p>
      </div>
    </div>
  );
}

function LineGraph1Zigzag() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-0 pt-[16px] px-0 relative rounded-[16px] shrink-0 w-full" data-name="Line Graph 1/zigzag">
      <Header />
      <GraphContainer />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame26 />
      <Frame8 />
      <LineGraph1Zigzag />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame10 />
      <Frame33 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame34 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[24px] top-[24px] w-[1584px]">
      <Breadcrumbs />
      <Frame27 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white h-[678px] relative shrink-0 w-[1632px]">
      <Frame40 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <SideBarTemplate />
      <Frame6 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[1920px]">
      <NavigationTemplate />
      <Frame41 />
    </div>
  );
}

export default function XemChiTitVideo() {
  return (
    <div className="bg-white relative size-full" data-name="Xem chi tiết video">
      <Frame42 />
    </div>
  );
}