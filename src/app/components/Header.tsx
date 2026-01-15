import svgPaths from '../../imports/svg-s0hhxgnsca';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from '../../assets/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';
import avatarDefault from '../../assets/14b6e09bbbce88048c49e0eb0b484cadeab01689.png';

export function Header() {
  return (
    <div className="bg-white relative w-full shrink-0">
      {/* Border and shadow overlay */}
      <div 
        aria-hidden="true" 
        className="absolute border-[#d0d5dd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]" 
      />
      
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-6 py-2.5 relative w-full">
          {/* Left Section: Menu + Logo */}
          <div className="basis-0 content-stretch flex gap-6 grow items-center min-h-px min-w-px relative shrink-0">
            {/* Menu Icon */}
            <button className="relative shrink-0 size-6 hover:opacity-70 transition-opacity">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g>
                  <path 
                    d="M3 12H21M3 6H21M3 18H21" 
                    stroke="var(--stroke-0, #101828)" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                  />
                </g>
              </svg>
            </button>
            
            {/* Logo */}
            <div className="h-8 relative shrink-0 w-[117.7px]">
              <ImageWithFallback 
                alt="Couppa" 
                className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" 
                src={logoImage} 
              />
            </div>
          </div>

          {/* Right Section: Search + Icons + Avatar */}
          <div className="content-stretch flex gap-4 items-center relative shrink-0">
            {/* Search Bar */}
            <div className="bg-[#f2f4f7] content-stretch flex gap-2 items-center pl-2 pr-3 py-1.5 relative rounded-[20px] shrink-0 w-[320px]">
              {/* Search Icon */}
              <div className="overflow-clip relative shrink-0 size-6">
                <div className="absolute inset-[8.33%]">
                  <div className="absolute inset-[0_-3.75%_-3.75%_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 20.75">
                      <g>
                        <path 
                          d="M15.5556 15.5556L20 20" 
                          stroke="var(--stroke-0, #101828)" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="1.5" 
                        />
                        <circle 
                          cx="9.44444" 
                          cy="9.44444" 
                          r="8.69444" 
                          stroke="var(--stroke-0, #101828)" 
                          strokeWidth="1.5" 
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              
              <input
                type="text"
                placeholder="Tìm kiếm nhanh"
                className="basis-0 bg-transparent border-none outline-none font-normal grow leading-5 min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-sm placeholder:text-[#667085]"
              />
              
              <p className="font-normal leading-5 not-italic relative shrink-0 text-[#667085] text-sm text-nowrap">
                Ctrl S
              </p>
            </div>

            {/* Home + Bell + Avatar */}
            <div className="content-stretch flex gap-3 items-center relative shrink-0">
              {/* Home Icon */}
              <button className="content-stretch flex items-start p-2 relative shrink-0 hover:bg-[#f9fafb] rounded transition-colors">
                <div className="relative shrink-0 size-6">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g>
                      <path 
                        d={svgPaths.p996d900} 
                        stroke="var(--stroke-0, #101828)" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                      />
                    </g>
                  </svg>
                </div>
              </button>

              {/* Bell Icon with Badge */}
              <button className="relative content-stretch flex gap-2 items-start p-2 shrink-0 hover:bg-[#f9fafb] rounded transition-colors">
                <div className="relative shrink-0 size-6">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g>
                      <path 
                        d={svgPaths.p2fb08800} 
                        stroke="var(--stroke-0, #101828)" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                      />
                    </g>
                  </svg>
                </div>
                
                {/* Badge */}
                <div className="absolute bg-[#d11313] content-stretch flex flex-col items-center justify-center left-5 px-1 py-0.5 rounded-[10px] top-0">
                  <p className="font-normal leading-3 not-italic relative shrink-0 text-xs text-nowrap text-white">
                    8
                  </p>
                </div>
              </button>

              {/* Avatar */}
              <button className="relative shrink-0 size-9">
                <ImageWithFallback 
                  alt="User" 
                  className="block max-w-none size-full rounded-full object-cover" 
                  src={avatarDefault} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}