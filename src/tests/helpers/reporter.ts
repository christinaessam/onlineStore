import {
    DisplayProcessor,
    SpecReporter,
    StacktraceOption,
  } from "jasmine-spec-reporter";
  import CustomReporter = jasmine.CustomReporter;
  import SuiteInfo = jasmine.SuiteInfo;
  
  class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
      return `TypeScript ${log}`;
    }
  }
  jasmine.getEnv().addReporter((new SpecReporter() as unknown) as CustomReporter);
//   jasmine.getEnv().clearReporters();
//   jasmine.getEnv().addReporter(
//     new SpecReporter({
//       spec: {
//         displayStacktrace: StacktraceOption.NONE,
//       },
//       customProcessors: [CustomProcessor],
//     })
//   );
  