import type { RoadmapStep } from "../types/roadmap";

const RoadmapTimeline = ({ steps }: { steps: RoadmapStep[] }) => {
  if (!steps.length) return null;

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-3xl">
        <div
          className="absolute left-5 top-0 h-full w-0.5 bg-violet-400"
          aria-hidden="true"
        />

        <ol className="space-y-10 list-none">
          {steps.map((step, index) => (
            <li
              key={`${step.step}-${index}`}
              className="relative pl-16 transition-all duration-300 hover:pl-18"
            >
              <div
                className="absolute text-sm left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-800 text-slate-50 ring-8 ring-violet-100 transition-transform duration-300 hover:scale-110"
                aria-hidden="true"
              >
                {index + 1}
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-violet-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500">{step.description}</p>

                {step.resources && step.resources.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-slate-500 mb-1">
                      Recursos:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {step.resources.map((resource, i) => (
                        <li key={i} className="text-sm text-slate-600">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:underline hover:text-violet-800 transition-colors"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RoadmapTimeline;
