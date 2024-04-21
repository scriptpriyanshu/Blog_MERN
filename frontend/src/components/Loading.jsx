import React from "react";

const Loading = () => {
  return (
    <>
      <main className="p-10 w-full flex justify-start items-center">
        <div class="shadow rounded-md h-56 bg-white p-4 w-full">
          <div class="animate-pulse flex space-x-4">
            <div class=" bg-slate-500  w-1/3 h-48 rounded-lg"></div>
            <div class="flex-1 space-y-8 py-1">
              <div class="h-8 bg-slate-500 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-5 bg-slate-500 rounded col-span-2"></div>
                  <div class="h-5 bg-slate-500 rounded col-span-1"></div>
                </div>
                <div className="space-y-9">
                  <div class="h-5 bg-slate-500 rounded"></div>
                  <div class="h-8 w-24 bg-slate-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Loading;
