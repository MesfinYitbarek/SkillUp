import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../../Common/Header";
import Footer from "../../../../Common/Footer";

const Assignment = () => {
  const [assignment, setAssignment] = useState(null);
  const { lessonId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`/api/assignment/${lessonId}`);
        setAssignment(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignment();
  }, [lessonId]);


  

  return (
    <div>
      <div>
        <div>
          <Header />
        </div>
        <div>
          <div className=" flex flex-col justify-center items-center  ">
            <div className=" m-10 bg-slate-100 shadow-sm">
              <div className=" bg-white px-12 p-3 min-w-[600px] m-10 shadow-md">
                {assignment ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      <span className=" mr-3">Title:</span>
                      {assignment.assignmentTitle}
                    </h2>
                    <p className="mb-4">
                      <span className=" mr-3">Description:</span>
                      {assignment.description}
                    </p>
                    <p className="mb-4">
                      Due Date:{" "}
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="text-2xl text-red-500">Assignment not Found</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
