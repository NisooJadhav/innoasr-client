import React from 'react'

const Table = () => {
  // Sample data for the table
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', role: 'Developer', department: 'IT', salary: '$75,000', experience: '5 years', status: 'Active', location: 'New York' },
    { id: 2, name: 'Jane Smith', age: 28, email: 'jane@example.com', role: 'Designer', department: 'Creative', salary: '$70,000', experience: '4 years', status: 'Active', location: 'San Francisco' },
    { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', role: 'Manager', department: 'Sales', salary: '$90,000', experience: '8 years', status: 'Inactive', location: 'Chicago' },
    // Add more rows as needed
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8" data-aos="fade-right">
      <div className="py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 ml-[14vw]">Projects Data</h2>
          <p className="mt-2 text-gray-600 ml-[14vw]">A comprehensive list of company employees</p>
        </div>
        <div className="shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-indigo-600 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Age</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Salary</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Experience</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-3 whitespace-nowrap">{employee.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.age}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.role}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.department}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.salary}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.experience}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{employee.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table