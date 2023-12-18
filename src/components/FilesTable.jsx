import { Link } from "react-router-dom"

function FilesTable({allFiles}) {
  return (
    <div className="relative overflow-x-auto mt-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    File Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Size
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            {allFiles?.reverse().map((file)=>( <tr key={file.fileName} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {file.fileName}
                </th>
                <td className="px-6 py-4">
                    {file.fileType}
                </td>
                <td className="px-6 py-4">
                    {(file.fileSize/1024/1024).toFixed(2)} Mb
                </td>
                <td className="px-6 py-4">
                   <Link to={`/dashboard/file-preview/${file.fileName}`}>view</Link>
                </td>
            </tr>))}
           
           
        </tbody>
    </table>
</div>
  )
}

export default FilesTable