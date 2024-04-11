import React, { useEffect, useState } from "react";

interface FormData {
  [key: string]: string | null;
}

interface SubmittedForm {
  formId: string;
  timestamp: string;
  formData: FormData;
}

const SubmittedForms: React.FC = () => {
  const [submittedForms, setSubmittedForms] = useState<SubmittedForm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Retrieve all keys from local storage
      const keys = Object.keys(localStorage);

      // Filter out keys that don't represent form data
      const formKeys = keys.filter((key) => key.startsWith("form_"));

      // Retrieve form data for each form key
      const forms: SubmittedForm[] = formKeys.map((key) => {
        const formData: FormData = JSON.parse(localStorage.getItem(key)!);
        // Add timestamp to form data
        const timestamp = new Date(Number(key.split("_")[1]));
        return {
          formId: key,
          timestamp: timestamp.toLocaleString(),
          formData: formData,
        };
      });

      // Update state with submitted forms
      setSubmittedForms(forms);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching submitted forms.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (submittedForms.length === 0) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className='text-center text-5xl font-bold'>
          No submitted forms found.
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Submitted Forms</h2>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Form ID</th>
              <th className='px-4 py-2'>Timestamp</th>
              <th className='px-4 py-2'>Form Data</th>
            </tr>
          </thead>
          <tbody>
            {submittedForms.map((form) => (
              <tr key={form.formId}>
                <td className='border px-4 py-2'>{form.formId}</td>
                <td className='border px-2 py-2'>{form.timestamp}</td>
                <td className='border px-4 py-2'>
                  <pre>{JSON.stringify(form.formData, null, 2)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedForms;
