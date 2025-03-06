"use client";
export default function FinancialScore() {
  return (
    <div className="flex bg-red-800 w-[100%] h-[100%]">
      <div className="flex w-[65%] flex-col">
        <div className="flex flex-col">
          <div>
            <p>Financial Checkup</p>
          </div>
          <div>
            <p>Analyse & improve your Financial Health</p>
          </div>
        </div>

        <div className="flex bg-blue-300">
          <div>image</div>
          <div>
            <p>35</p>
          </div>
          <div className="flex flex-col">
            <div>
              <p>Financial Health Score</p>
            </div>
            <div>
              <p>out of 100</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p>Your Financial Health Status</p>
          </div>
          <div>
            <p>Refer to the Contributors for more details</p>
          </div>
        </div>

        <div className="bg-purple-500 w-[100] h-[20%]">

        </div>
      </div>
      <div className="flex w-[45%]"></div>
    </div>
  );
}
