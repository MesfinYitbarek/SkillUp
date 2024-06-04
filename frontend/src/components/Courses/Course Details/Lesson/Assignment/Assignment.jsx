import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";  // Adjust the import path accordingly
import Header from "../../../../Common/Header";
import Footer from "../../../../Common/Footer";
import { useSelector } from "react-redux";

const Assignment = () => {
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const { lessonId } = useParams();
  const {currentUser} = useSelector((state)=> state.user)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`/api/assignment/${lessonId}`);
        setAssignment(response.data);
      } catch (error) {
        console.error("Error fetching assignment", error);
      }
    };

    fetchAssignment();
  }, [lessonId]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const storage = getStorage();
    setUploadError(null);
    const storageRef = ref(storage, `assignments/${lessonId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setUploadError("File upload failed. Please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await axios.post(`/api/assignment/submit`, {
              lessonId,
              fileUrl: downloadURL,
              StudentId: currentUser._id,
              StudentName: currentUser.username,
            });
            alert("Assignment submitted successfully!");
            setFile(null);
            setUploadProgress(0);
          } catch (error) {
            console.error("Error submitting assignment", error);
            setUploadError("Assignment submission failed. Please try again.");
          }
        });
      }
    );
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="m-10 bg-slate-100 shadow-sm">
          <div className="bg-white px-12 p-3 min-w-[600px] m-10 shadow-md">
            {assignment ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  <span className="mr-3">Title:</span>
                  {assignment.assignmentTitle}
                </h2>
                <p className="mb-4">
                  <span className="mr-3">Description:</span>
                  {assignment.description}
                </p>
                <p className="mb-4">
                  Due Date:{" "}
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                <div className="mb-4">
                  <input type="file" onChange={handleFileChange} />
                  <button
                    onClick={handleFileUpload}
                    className="bg-blue-500 text-white rounded-md px-3 py-2 mt-3"
                  >
                    Upload Assignment
                  </button>
                  {uploadProgress > 0 && (
                    <div className="mt-3">
                      <progress value={uploadProgress} max="100" />
                      <span>{uploadProgress.toFixed(2)}%</span>
                    </div>
                  )}
                  {uploadError && (
                    <div className="mt-3 text-red-500">{uploadError}</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-2xl text-red-500">Assignment not Found</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assignment;