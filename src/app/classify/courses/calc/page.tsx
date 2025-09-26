import CourseEvaluation from "../../components/evaluation";
import "@/styles/globals.css";
import Navigation from "@/components/nav";
import { templateData } from "../../data/template";

type Prescription = {
  [section: string]: {
    [subcategory: string]: number | string;
    description: string;
  }[];
};

const prescription: Prescription = {
  Lectures: [
    { frequency: 3, description: "Daily lectures" },
    { participation: 0, description: "" },
  ],
  "Classwork and Homework": [
    { frequency: 3, description: "" },
    { significance: 0, description: "" },
  ],
  "Scheduled assessments": [
    { frequency: 3, description: "" },
    {
      significance: 4,
      description:
        "Your grade in this class is determined solely by your performance on its assessments.  Classwork and homework is either ungraded and, if graded, will have a negligible impact on your class score.",
    },
    {
      rigor: 3,
      description:
        "Assessment problems will generally be slightly below or at the AP standard.",
    },
  ],
  "Pop quizzes": [
    {
      frequency: 3,
      description:
        "Quick quizzes are administered on a fairly frequent basis.  Sometimes, advance notification will be given.  Other times, not.",
    },
    {
      significance: 2,
      description:
        "Quick quizzes are worth considerably less than scheduled tests.",
    },
    {
      rigor: 3,
      description:
        "Many quick quizzes will require a thorough knowledge of the course content and may deviate from AP-style questions.",
    },
  ],
  "Group projects": [
    {
      frequency: 2,
      description:
        "Quick quizzes may occasionally be administered alongside a randomly selected partner.",
    },
    {
      significance: 2,
      description:
        "Quick quizzes are worth considerably less than scheduled tests.",
    },
    {
      rigor: 3,
      description:
        "Many quick quizzes will require a thorough knowledge of the course content and may deviate from AP-style questions.",
    },
  ],
  "Extra credit": [
    {
      frequency: 1,
      description: "",
    },
    {
      significance: 1,
      description:
        "A few points here and there for typically competitive extra credit points.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <Navigation></Navigation>
      <div className="bg-blue-50">
        <div className="border-blue-300 border-b">
          <div className=" ml-[20%] mr-[20%] tracking-tighter text-blue-700 pt-14 pb-8 border-blue-300 border-l border-r ">
            <div className="p-10">
              <span className="font-medium text-4xl inline-block">
                Classify
              </span>
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
              <span className="font-medium text-7xl block">
                AP Calculus (Federwoicz)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50">
        <div className="ml-[20%] mr-[30%] border-blue-300 border-l border-r bg-white">
          <div className="text-xl pt-10 pl-10 pr-10 tracking-tighter">
            <span className="block">
              <strong>Available to:</strong> 11, 12
            </span>
            <span className="block">
              <strong>Prerequisites:</strong> Precalculus
            </span>
            <span className="block">
              <strong>Textbook:</strong> Yes
            </span>
          </div>
          <CourseEvaluation
            template={templateData}
            prescription={prescription}
          />
        </div>
      </div>
    </>
  );
}
