import svgPaths from "./svg-2f95nraunm";
import imgEllipse3 from "figma:asset/14b6e09bbbce88048c49e0eb0b484cadeab01689.png";
import imgMountains from "figma:asset/0d4c4808f6616a3f35401a425bcd0dc9b293b526.png";

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

function Frame8() {
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

function Frame6() {
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

function Frame5() {
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

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start p-[8px] relative shrink-0">
      <Bell />
      <Frame />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame5 />
      <Frame4 />
      <div className="relative shrink-0 size-[36px]">
        <img alt="" className="block max-w-none size-full" height="36" src={imgEllipse3} width="36" />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame6 />
      <Frame61 />
    </div>
  );
}

function NavigationTemplate() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Navigation-template">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[10px] relative w-full">
          <Frame8 />
          <Frame7 />
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

function Breadcrumbs() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Breadcrumbs">
      <BreadcrumbButtonBase />
      <ChevronRight />
      <BreadcrumbButtonBase1 />
      <ChevronRight />
      <BreadcrumbButtonBase2 />
    </div>
  );
}

function PlusLarge() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus-large">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus-large">
          <path d="M12 4V20M4 12H20" id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#e50914] content-stretch flex gap-[8px] h-[36px] items-center justify-end overflow-clip pl-[16px] pr-[20px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <PlusLarge />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white">Đăng video</p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Button />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0">
      <Frame60 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[1542px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[#101828] text-[20px] text-nowrap">Video</p>
      <Frame59 />
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-[4px] py-[6px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">Tất cả trạng thái</p>
      <ChevronDown3 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] w-[74px]">Ngày đăng</p>
    </div>
  );
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="calendar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="calendar">
          <path d={svgPaths.p3d9d3970} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[6px] relative w-full">
          <Content />
          <Calendar />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Input1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[145px]" data-name="Input">
      <Input />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[0_-3.75%_-3.75%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 20.75">
          <g id="Group 12">
            <path d="M15.5556 15.5556L20 20" id="Vector 22" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <circle cx="9.44444" cy="9.44444" id="Ellipse 50" r="8.69444" stroke="var(--stroke-0, #344054)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Search1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="search">
      <Group1 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] h-[36px] items-center px-[12px] py-[8px] relative rounded-[8px] shrink-0 w-[400px]">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[14px]">Tiêu đề</p>
      <div className="bg-[#d0d5dd] h-[24px] shrink-0 w-px" />
      <Search1 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame10 />
      <Input1 />
      <Frame13 />
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">Sắp xếp theo</p>
      <ChevronDown4 />
    </div>
  );
}

function ChevronDown5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">Chiều sắp xếp</p>
      <ChevronDown5 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame11 />
      <Frame14 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <Frame66 />
      <Frame67 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-[1541px]">
      <Frame68 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white content-stretch flex items-start justify-between relative shrink-0 w-[1543px]">
      <Frame58 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[2px] items-start leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">10</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">/</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">Trang</p>
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-up">
          <path d="M15 12.5L10 7.5L5 12.5" id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-[112px]" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] w-full">
        <Frame3 />
        <ChevronUp />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Button1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Tổng số bản ghi: 915</p>
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-left">
          <path d="M12.5 15L7.5 10L12.5 5" id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function Arround() {
  return (
    <div className="backdrop-blur-sm backdrop-filter bg-white content-stretch flex items-center justify-center p-[8px] relative rounded-[18px] shrink-0" data-name="arround">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <ChevronLeft />
    </div>
  );
}

function Content1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap">1</p>
    </div>
  );
}

function PaginationNumberBase() {
  return (
    <div className="overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content1 />
    </div>
  );
}

function Content2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">2</p>
    </div>
  );
}

function PaginationNumberBase1() {
  return (
    <div className="bg-[#f24141] overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content2 />
    </div>
  );
}

function Content3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap">3</p>
    </div>
  );
}

function PaginationNumberBase2() {
  return (
    <div className="overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap">...</p>
    </div>
  );
}

function PaginationNumberBase3() {
  return (
    <div className="overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content4 />
    </div>
  );
}

function Content5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap">8</p>
    </div>
  );
}

function PaginationNumberBase4() {
  return (
    <div className="overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content5 />
    </div>
  );
}

function Content6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap">9</p>
    </div>
  );
}

function PaginationNumberBase5() {
  return (
    <div className="overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content6 />
    </div>
  );
}

function Content7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap">10</p>
    </div>
  );
}

function PaginationNumberBase6() {
  return (
    <div className="overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content7 />
    </div>
  );
}

function PaginationNumbers() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
      <PaginationNumberBase />
      <PaginationNumberBase1 />
      <PaginationNumberBase2 />
      <PaginationNumberBase3 />
      <PaginationNumberBase4 />
      <PaginationNumberBase5 />
      <PaginationNumberBase6 />
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-right">
          <path d="M7.5 15L12.5 10L7.5 5" id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function Arround1() {
  return (
    <div className="backdrop-blur-sm backdrop-filter bg-white content-stretch flex items-center justify-center p-[8px] relative rounded-[18px] shrink-0" data-name="arround">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <ChevronRight1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0">
      <Arround />
      <PaginationNumbers />
      <Arround1 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex items-center justify-between left-[24px] px-0 py-[8px] w-[1584px]" data-name="Pagination">
      <div aria-hidden="true" className="absolute border-[#f2f4f7] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Square() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="square">
          <path d={svgPaths.p7788600} id="Icon" stroke="var(--stroke-0, #D0D5DD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Square />
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative shrink-0 w-[50px]" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame28 />
    </div>
  );
}

function Square1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="square">
          <path d={svgPaths.p7788600} id="Icon" stroke="var(--stroke-0, #D0D5DD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Square1 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame29 />
    </div>
  );
}

function Square2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="square">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="square">
          <path d={svgPaths.p7788600} id="Icon" stroke="var(--stroke-0, #D0D5DD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Square2 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="bg-white content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame30 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
      <TableHeaderCell />
      <TableCell />
      <TableCell1 />
      <TableCell />
      <TableCell1 />
      <TableCell />
      <TableCell1 />
      <TableCell />
      <TableCell1 />
      <TableCell />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">STT</p>
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative shrink-0 w-[50px]" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableHeader />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">1</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame31 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">2</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="bg-white content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame32 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">3</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame33 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">4</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="bg-white content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame34 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">5</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame35 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">6</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="bg-white content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame36 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic opacity-80 relative shrink-0 text-[#101828] text-[14px] text-nowrap">8</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame37 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">9</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="bg-white content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame38 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">10</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center p-[16px] relative shrink-0 w-[50px]" data-name="Table cell">
      <Frame39 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
      <TableHeaderCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Video</p>
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative w-full">
          <TableHeader1 />
        </div>
      </div>
    </div>
  );
}

function Mountains() {
  return (
    <div className="h-[56px] overflow-clip relative rounded-[8px] shrink-0 w-[70px]" data-name="Mountains">
      <div className="absolute inset-0 rounded-[3px]" data-name="Mountains">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3px] size-full" src={imgMountains} />
      </div>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <Mountains />
        </div>
      </div>
    </div>
  );
}

function Mountains1() {
  return (
    <div className="h-[56px] overflow-clip relative rounded-[8px] shrink-0 w-[70px]" data-name="Mountains">
      <div className="absolute inset-0 rounded-[3px]" data-name="Mountains">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3px] size-full" src={imgMountains} />
      </div>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <Mountains1 />
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[117px]">
      <TableHeaderCell2 />
      <TableCell11 />
      <TableCell12 />
      <TableCell11 />
      <TableCell12 />
      <TableCell11 />
      <TableCell12 />
      <TableCell11 />
      <TableCell12 />
      <TableCell11 />
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Tiêu đề</p>
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative w-full">
          <TableHeader2 />
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Combo ưu đãi đặc biệt tháng 12</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[14px] relative size-full">
          <Frame43 />
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Combo ưu đãi đặc biệt tháng 11</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[14px] relative size-full">
          <Frame44 />
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Combo ưu đãi đặc biệt tháng 10</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[14px] relative size-full">
          <Frame45 />
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Combo ưu đãi đặc biệt tháng 10, deal HOT nhất năm ...</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[14px] relative size-full">
          <Frame46 />
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Combo ưu đãi đặc biệt tháng 9</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[14px] relative size-full">
          <Frame47 />
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Combo ưu đãi đặc biệt tháng 12</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[14px] relative size-full">
          <Frame48 />
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-[415px]">
      <TableHeaderCell3 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell13 />
      <TableCell18 />
      <TableCell13 />
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Trạng thái</p>
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative w-full">
          <TableHeader3 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase() {
  return (
    <div className="bg-[#d1fadf] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027948] text-[12px] text-center text-nowrap">Đã đăng</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge />
    </div>
  );
}

function BadgeBase1() {
  return (
    <div className="bg-[#d1fadf] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027948] text-[12px] text-center text-nowrap">Đã đăng</p>
    </div>
  );
}

function Badge1() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase1 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge1 />
    </div>
  );
}

function BadgeBase2() {
  return (
    <div className="bg-[#f2f4f7] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#333f53] text-[12px] text-center text-nowrap">Đã ẩn</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase2 />
    </div>
  );
}

function TableCell21() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge2 />
    </div>
  );
}

function BadgeBase3() {
  return (
    <div className="bg-[#f27272] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#590506] text-[12px] text-center text-nowrap">Vi phạm</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase3 />
    </div>
  );
}

function TableCell22() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge3 />
    </div>
  );
}

function BadgeBase4() {
  return (
    <div className="bg-[rgba(216,109,56,0.2)] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#d86d38] text-[12px] text-center text-nowrap">Từ chối</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase4 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge4 />
    </div>
  );
}

function BadgeBase5() {
  return (
    <div className="bg-[#fef9c2] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#a65f00] text-[12px] text-center text-nowrap">Chờ duyệt</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase5 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge5 />
    </div>
  );
}

function BadgeBase6() {
  return (
    <div className="bg-[#fef9c2] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#a65f00] text-[12px] text-center text-nowrap">Chờ duyệt</p>
    </div>
  );
}

function Badge6() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase6 />
    </div>
  );
}

function TableCell25() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge6 />
    </div>
  );
}

function BadgeBase7() {
  return (
    <div className="bg-[#c2e5fe] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#004da6] text-[12px] text-center text-nowrap">Nháp</p>
    </div>
  );
}

function Badge7() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply px-[16px] py-0 relative shrink-0" data-name="Badge">
      <BadgeBase7 />
    </div>
  );
}

function TableCell26() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[80px] items-start justify-center px-0 py-[16px] relative shrink-0 w-full" data-name="Table cell">
      <Badge7 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-[108px]">
      <TableHeaderCell4 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell24 />
      <TableCell26 />
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Chia sẻ</p>
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[10px] relative w-full">
          <TableHeader4 />
        </div>
      </div>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">15</p>
        </div>
      </div>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">1565</p>
        </div>
      </div>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">2</p>
        </div>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0">
      <TableHeaderCell5 />
      <TableCell27 />
      <TableCell28 />
      <TableCell27 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell30 />
      <TableCell31 />
      <TableCell30 />
    </div>
  );
}

function TableHeader5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Click coupon</p>
    </div>
  );
}

function TableHeaderCell6() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[10px] relative w-full">
          <TableHeader5 />
        </div>
      </div>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">30</p>
        </div>
      </div>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">3000</p>
        </div>
      </div>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0">
      <TableHeaderCell6 />
      <TableCell32 />
      <TableCell33 />
      <TableCell32 />
      <TableCell34 />
      <TableCell35 />
      <TableCell34 />
      <TableCell35 />
      <TableCell34 />
      <TableCell35 />
    </div>
  );
}

function TableHeader6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Lượt xem</p>
    </div>
  );
}

function TableHeaderCell7() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[10px] relative w-full">
          <TableHeader6 />
        </div>
      </div>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">20.1k</p>
        </div>
      </div>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">20.1M</p>
        </div>
      </div>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">2010</p>
        </div>
      </div>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">100</p>
        </div>
      </div>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0">
      <TableHeaderCell7 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
      <TableCell40 />
      <TableCell41 />
      <TableCell40 />
    </div>
  );
}

function TableHeader7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Lượt thích</p>
    </div>
  );
}

function TableHeaderCell8() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[10px] relative w-full">
          <TableHeader7 />
        </div>
      </div>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">155</p>
        </div>
      </div>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">15k</p>
        </div>
      </div>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">15</p>
        </div>
      </div>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">1</p>
        </div>
      </div>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function TableCell47() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0">
      <TableHeaderCell8 />
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell46 />
      <TableCell47 />
      <TableCell46 />
    </div>
  );
}

function TableHeader8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Bình luận</p>
    </div>
  );
}

function TableHeaderCell9() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[10px] relative w-full">
          <TableHeader8 />
        </div>
      </div>
    </div>
  );
}

function TableCell48() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">50</p>
        </div>
      </div>
    </div>
  );
}

function TableCell49() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">5000</p>
        </div>
      </div>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">5</p>
        </div>
      </div>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">5</p>
        </div>
      </div>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function TableCell53() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col items-end justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center overflow-clip relative shrink-0">
      <TableHeaderCell9 />
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
      <TableCell52 />
      <TableCell53 />
      <TableCell52 />
    </div>
  );
}

function TableHeader9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Ngày đăng</p>
    </div>
  );
}

function TableHeaderCell10() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative w-full">
          <TableHeader9 />
        </div>
      </div>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">01/12/2025 16:39</p>
        </div>
      </div>
    </div>
  );
}

function TableCell55() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">01/11/2025 16:39</p>
        </div>
      </div>
    </div>
  );
}

function TableCell56() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">01/10/2025 16:50</p>
        </div>
      </div>
    </div>
  );
}

function TableCell57() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[80px] items-start justify-center p-[16px] relative shrink-0 w-[150px]" data-name="Table cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">01/10/2025 16:39</p>
    </div>
  );
}

function TableCell58() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">01/09/2025 16:39</p>
        </div>
      </div>
    </div>
  );
}

function TableCell59() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Table cell">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">01/12/2025 16:39</p>
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0">
      <TableHeaderCell10 />
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
      <TableCell54 />
      <TableCell59 />
      <TableCell54 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative w-full">
          <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px] text-center">Hành động</p>
        </div>
      </div>
    </div>
  );
}

function Eye() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="eye">
          <path d={svgPaths.p2b788400} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <circle cx="12" cy="12" id="Ellipse 17" r="2.25" stroke="var(--stroke-0, #101828)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start p-[6px] relative shrink-0">
      <Eye />
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]">
      <div className="absolute inset-[-3.75%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 21.5">
          <g id="Group 38113">
            <path d="M0.75 4.75H18.75" id="Vector 31" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1f536a80} id="Vector 32" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1005c880} id="Vector 33" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M7.75 10.75L7.75 14.75" id="Vector 34" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M11.75 10.75L11.75 14.75" id="Vector 35" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0 size-[36px]">
      <Group2 />
    </div>
  );
}

function Pencil() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pencil">
          <path d={svgPaths.p29d1d8f0} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start p-[6px] relative shrink-0">
      <Pencil />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center px-[16px] py-[12px] relative shrink-0 w-[170px]">
      <Frame19 />
      <Frame18 />
      <Frame17 />
    </div>
  );
}

function Eye1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="eye">
          <path d={svgPaths.p2b788400} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <circle cx="12" cy="12" id="Ellipse 17" r="2.25" stroke="var(--stroke-0, #101828)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-start p-[6px] relative shrink-0">
      <Eye1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]">
      <div className="absolute inset-[-3.75%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 21.5">
          <g id="Group 38113">
            <path d="M0.75 4.75H18.75" id="Vector 31" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1f536a80} id="Vector 32" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1005c880} id="Vector 33" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M7.75 10.75L7.75 14.75" id="Vector 34" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M11.75 10.75L11.75 14.75" id="Vector 35" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0 size-[36px]">
      <Group3 />
    </div>
  );
}

function Pencil1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pencil">
          <path d={svgPaths.p29d1d8f0} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-start p-[6px] relative shrink-0">
      <Pencil1 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-white content-stretch flex h-[80px] items-center justify-center px-[16px] py-[12px] relative shrink-0 w-[170px]">
      <Frame22 />
      <Frame23 />
      <Frame24 />
    </div>
  );
}

function EyeOff() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="eye-off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="eye-off">
          <path d={svgPaths.p23dc1a90} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start p-[6px] relative shrink-0">
      <EyeOff />
    </div>
  );
}

function Group4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]">
      <div className="absolute inset-[-3.75%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 21.5">
          <g id="Group 38113">
            <path d="M0.75 4.75H18.75" id="Vector 31" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1f536a80} id="Vector 32" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1005c880} id="Vector 33" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M7.75 10.75L7.75 14.75" id="Vector 34" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M11.75 10.75L11.75 14.75" id="Vector 35" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0 size-[36px]">
      <Group4 />
    </div>
  );
}

function Pencil2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pencil">
          <path d={svgPaths.p29d1d8f0} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-start p-[6px] relative shrink-0">
      <Pencil2 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex h-[80px] items-center justify-center px-[16px] py-[12px] relative shrink-0 w-[170px]">
      <Frame20 />
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute content-stretch flex flex-col items-center overflow-clip right-0 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] top-0 w-[155px]">
      <Frame15 />
      <Frame16 />
      <Frame21 />
      <Frame27 />
      <Frame21 />
      <Frame16 />
      <Frame21 />
      <Frame16 />
      <Frame21 />
      <Frame16 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Table">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame40 />
        <Frame57 />
        <Frame51 />
        <Frame41 />
        <Frame50 />
        <Frame49 />
        <Frame52 />
        <Frame53 />
        <Frame54 />
        <Frame55 />
        <Frame56 />
        <Frame42 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame63() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[8px] py-0 relative shrink-0 w-[1552px]">
      <Table />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] h-[1020px] items-start p-[24px] relative shrink-0 w-[1632px]">
      <Breadcrumbs />
      <Frame62 />
      <Frame12 />
      <Pagination />
      <Frame63 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <SideBarTemplate />
      <Frame9 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[1920px]">
      <NavigationTemplate />
      <Frame65 />
    </div>
  );
}

function XemDanhSachVideo() {
  return (
    <div className="absolute bg-white h-[1080px] left-0 overflow-clip top-0 w-[1920px]" data-name="Xem danh sách video">
      <Frame64 />
    </div>
  );
}

export default function Group5() {
  return (
    <div className="relative size-full">
      <XemDanhSachVideo />
    </div>
  );
}