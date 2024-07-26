import { getUser } from "@workos-inc/authkit-nextjs";
import { createCompany } from "../actions/workosActions";

export default async function NewCompanyPage() {
  const { user } = await getUser();
  if (!user) {
    return (
      <div className="container">
        <div>You need to be logged in to use this page</div>
      </div>
    );
  }
  const handleAddNewCompany = async (data: FormData) => {
    "use server";
    await createCompany(data.get("newCompanyName") as string, user.id);
  };

  return (
    <div className="container">
      <h2 className="text-lg mt-6">Create a new company</h2>
      <p className="text-gray-500 text-sm- mb-2">
        To create a job listing your first need to register a company
      </p>
      <form action={handleAddNewCompany} className="flex gap-2">
        <input
          type="text"
          name="newCompanyName"
          id=""
          placeholder="Company name"
          className="border border-gray-400 py-2 px-3 rounded-md"
        />
        <button
          type="submit"
          className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md"
        >
          Create company
        </button>
      </form>
    </div>
  );
}
