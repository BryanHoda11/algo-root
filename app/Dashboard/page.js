'use client'
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import { MdOutlineArrowLeft } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";

const page = () => {
    const [users, setUsers] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("https://dummyjson.com/users");
            const data = await response.json();
            setUsers(data.users);
        };

        fetchUsers();
    }, []);

    // Sort in ascending order by ID
    const sortAscending = () => {
        const sortedUsers = [...users].sort((a, b) => a.id - b.id);
        setUsers(sortedUsers);
        setIsAscending(true);
    };

    // Sort in descending order by ID
    const sortDescending = () => {
        const sortedUsers = [...users].sort((a, b) => b.id - a.id);
        setUsers(sortedUsers);
        setIsAscending(false);
    };

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const nextPage = () => {
        if ((currentPage + 1) * usersPerPage < users.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle Previous Page
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        console.log("Current Page:", currentPage);
    }, [currentPage]);

    return (
        <>
            <Navbar />

            <div className="container overflow-x-auto w-[85%] mx-auto">

                <div className="filters my-5 flex max-md:flex-col items-center gap-3">

                    <div className="sort flex items-center gap-3">
                        <button onClick={sortAscending} className="bg-gray-800 rounded-lg px-5 py-2 cursor-pointer"><AiOutlineSortAscending size={23} /></button>
                        <button onClick={sortDescending} className="bg-gray-800 rounded-lg px-5 py-2 cursor-pointer"><AiOutlineSortDescending size={23} /></button>
                    </div>
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className="w- rounded-lg px-5 py-2 bg-gray-800" name="text" placeholder="Search" />

                </div>

                <table className="min-w-full mx-auto my-10 border-collapse border border-gray-700">
                    <thead>
                        <tr>
                            <th className="border border-gray-700 p-2">Sr No.</th>
                            <th className="border border-gray-700 p-2">First Name</th>
                            <th className="border border-gray-700 p-2">Last Name</th>
                            <th className="border border-gray-700 p-2">Age</th>
                            <th className="border border-gray-700 p-2">Username</th>
                            <th className="border border-gray-700 p-2">City</th>
                            <th className="border border-gray-700 p-2">Profession</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchQuery ? (
                            filteredUsers.length > 0 ? (
                                filteredUsers.slice(0, 10).map((user) => (
                                    <tr key={user.id} className="text-center border">
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.id}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.firstName}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.lastName}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.age}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.username}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.address.city}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.company.title}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-4 text-gray-500">No results found</td>
                                </tr>
                            )
                        ) : (
                            users.length > 0 ? (
                                users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage).map((user) => (
                                    <tr key={user.id} className="text-center border">
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.id}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.firstName}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.lastName}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.age}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.username}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.address.city}</td>
                                        <td className="border border-gray-700 p-2 bg-neutral-900">{user.company.title}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-4 text-gray-500">Loading Data...</td>
                                </tr>
                            )
                        )}
                    </tbody>

                </table>

                <div className="arrows flex justify-center max-sm:gap-5 sm:justify-between w-full">
                    <button onClick={prevPage} disabled={currentPage === 0} className="bg-gray-800 text-white h-12 w-12 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-50">
                        <MdOutlineArrowLeft size={30} />
                    </button>

                    <button onClick={nextPage} disabled={(currentPage + 1) * usersPerPage >= users.length} className="bg-gray-800 text-white h-12 w-12 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-50">
                        <MdOutlineArrowRight size={30} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default page
