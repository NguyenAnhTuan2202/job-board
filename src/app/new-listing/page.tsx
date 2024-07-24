import { getUser } from "@workos-inc/authkit-nextjs";

export default async function NewListingPage() {
  const { user } = await getUser();
  return (
    <div className="container">
      {!user && <div>You need to be logged in to post a job</div>}
      {user && (
        <div>
          <h2 className="text-lg mt-6">Your companies</h2>
          <p className="text-gray-500 text-sm mb-2">
            Select a company to create a job add for
          </p>
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
            No companies found assigned to your user
          </div>

          <h2 className="text-lg mt-6">Create a new company</h2>
          <p className="text-gray-500 text-sm- mb-2">
            To create a job listing your first need to register a company
          </p>
          <form action="" className="flex gap-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="Company name"
              className="border border-gray-400 py-2 px-3 rounded-md"
            />
            <button className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md">
              Create company
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
