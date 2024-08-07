import { useState } from "react";

export default function ModelPopUp() {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0"></div>
            <div className="ml-4 w-full">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Quick Test
              </h3>
              <div className="mt-2 text-sm text-gray-500 grid grid-cols-12 gap-2">
                <div className="col-span-9">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed.
                </div>
                <div className="col-span-3">
                  This action cannot be undone.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Deactivate
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}
