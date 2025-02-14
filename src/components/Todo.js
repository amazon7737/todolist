import React, { useEffect, useState } from "react";

export default function Todo() {
  const [lists, setLists] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  function getLists() {
    const lists = localStorage.getItem("lists");
    if (lists) {
      setLists(JSON.parse(lists));
    }
  }

  function saveLists(updatedLists) {
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    setLists(updatedLists);
  }

  function handleAddTodo() {
    if (newTodo.trim()) {
      const updatedLists = [...lists, newTodo];
      saveLists(updatedLists);
      setNewTodo("");
      setIsAdding(false);
    }
  }

  function handleDeleteTodo(indexToDelete) {
    const updatedLists = lists.filter((_, index) => index !== indexToDelete);
    saveLists(updatedLists);
  }

  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      <div className="content p-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">Todo List</h2>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsAdding(true)}
            className="px-2 py-1 md:px-3 md:py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm md:text-base"
          >
            +
          </button>
        </div>

        {isAdding && (
          <div className="mb-4 p-3 md:p-4 border border-gray-200 rounded-lg bg-white/50">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md mb-2"
              placeholder="새로운 할 일을 입력하세요"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddTodo}
                className="px-2 py-1 md:px-3 md:py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm md:text-base"
              >
                추가
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewTodo("");
                }}
                className="px-2 py-1 md:px-3 md:py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm md:text-base"
              >
                취소
              </button>
            </div>
          </div>
        )}

        <div className="cardlist grid grid-cols-1 gap-3 md:gap-4">
          {lists.map((list, index) => (
            <div
              key={index}
              className="card p-3 md:p-4 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow text-sm md:text-base"
            >
              <div className="flex justify-between items-center">
                <span>{list}</span>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="px-2 py-0.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
