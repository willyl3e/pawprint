import '@/styles/globals.css'
import Navigation from '@/components/nav'

export default function Page() {
    return (
        <>
            <Navigation />
            <div className="bg-blue-50">
                <div className="ml-[20%] mr-[20%] tracking-tighter text-blue-700 pt-[5%] border-blue-300 border-b border-l border-r pb-14 pl-10 pr-10">
                    <span className="font-medium text-4xl">
                        The Seymour Pawprint
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="25px"
                            viewBox="0 -960 960 960"
                            width="25px"
                            fill="#1d4ed8"
                            className="inline-block ml-2 mb-2"
                        >
                            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                        </svg>{" "}
                    </span>
                    <span className="font-medium text-7xl block">Classify</span>
                </div>
            </div>
        </>
    )
}