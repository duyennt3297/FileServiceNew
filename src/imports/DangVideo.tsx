import svgPaths from "./svg-im98pfdbmd";
import imgImage from "figma:asset/e80a6f0c9ae74e85d3d4e3b09cf36c08074c7526.png";

function XSmall() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="x-small">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="x-small">
          <path d="M18 6L6 18M6 6L18 18" id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ButtonX40PxDefault() {
  return (
    <div className="absolute content-stretch flex items-start left-[428px] p-[6px] rounded-[8px] top-[16px]" data-name="Button x/40px/Default">
      <XSmall />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#101828]">Video</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#f04438]">*</p>
    </div>
  );
}

function Frame10() {
  return <div className="h-[20px] shrink-0 w-[118px]" />;
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame5 />
      <Frame10 />
    </div>
  );
}

function Upload() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="upload">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="upload">
          <path d="M17 8L12 3M12 3L7 8M12 3V15" id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29565380} id="Vector 21" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29565380} id="Vector 20" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center p-[16px] relative w-full">
          <Upload />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Tải hoặc kéo thả video</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#667085] text-[12px] text-nowrap">Hỗ trợ file: .mp4, .mov, .avi. Tối đa 500MB</p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <Frame11 />
      <Frame8 />
    </div>
  );
}

function Upload1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Upload">
      <Frame9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#101828]">Tiêu đề</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#f04438]">*</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[6px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InputText() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input text">
      <Frame2 />
      <Input />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Mô tả</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">0/255</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[11.59px] size-[12px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2 4.5H10" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 7.5H10" id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5 1.5L4 10.5" id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 1.5L7 10.5" id="Vector_4" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f3f4f6] h-[24px] relative rounded-[10px] shrink-0 w-[90px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[51.59px] not-italic text-[#364153] text-[12px] text-center text-nowrap top-[2px] translate-x-[-50%]">Hashtag</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[128px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start px-[14px] py-[10px] relative size-full">
          <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow h-full leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[14px]">Nhập nội dung...</p>
          <Button />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InputText1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input text">
      <Frame1 />
      <Input1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#101828]">Gắn Coupon</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#f04438]">&nbsp;</p>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap">--Chọn--</p>
    </div>
  );
}

function ChevronDown() {
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

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Content />
          <ChevronDown />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Select() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Select">
      <Frame4 />
      <Input2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[0_-5%_-5%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.75 15.75">
          <g id="Group 12">
            <path d="M11.6667 11.6667L15 15" id="Vector 22" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <circle cx="7.08333" cy="7.08333" id="Ellipse 50" r="6.33333" stroke="var(--stroke-0, #667085)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]" data-name="search">
      <Group />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[28px] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative size-full">
          <Search />
          <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[14px]">Tìm kiếm coupon....</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5db] border-[1.219px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Image() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[64px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgImage} />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[9px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g id="chevron-right">
          <path d={svgPaths.p1b3a0c40} id="Icon" stroke="var(--stroke-0, #E50914)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e50914] text-[9px] text-center text-nowrap">
        <p className="leading-[21px]">Chi tiết</p>
      </div>
      <ChevronRight />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#667085] text-[9px] w-[135px]">HSD: 05/01/2026 - 11/01/2026</p>
      <Frame12 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-black w-[200px]">Giảm 30% bộ sưu tập mùa...</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#e50914] text-[13px] text-nowrap">15.000đ</p>
      <Frame13 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[80px] relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container />
        <Image />
        <Frame14 />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
        <Input3 />
        {[...Array(3).keys()].map((_, i) => (
          <Frame15 key={i} />
        ))}
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Select />
      <Frame16 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] py-[2px] relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">Hủy bỏ</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f24141] content-stretch flex gap-[8px] h-[36px] items-center justify-end overflow-clip pl-[16px] pr-[20px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white">Đăng</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Button2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-full">
      <Button1 />
      <Frame7 />
    </div>
  );
}

export default function DangVideo() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[16px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] size-full" data-name="Đăng video">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic relative shrink-0 text-[#101828] text-[20px] text-nowrap">Đăng video mới</p>
      <ButtonX40PxDefault />
      <Upload1 />
      <InputText />
      <InputText1 />
      <Frame17 />
      <Frame6 />
    </div>
  );
}