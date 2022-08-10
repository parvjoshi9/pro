import React from "react";
import "./index.css";
import { useContext, useState } from "react";
import Move from "./svg/move.svg";
import Trash from "./svg/trash.svg";
import { MyContext } from "../mainFunctions";
import RightArrow from "./svg/right-arrow.svg";
import LeftArrow from "./svg/left-arrow.svg";

export default function Index() {
  const [currentIndent, setCurrentIndent] = useState("CHAPTER");
  const [newStandard, setNewStandard] = useState("");
  const getConsumer = useContext(MyContext);
  const { children, childrenAllidsorder } = getConsumer.state;
  const { triggerDragDrop } = getConsumer;
  const [dragOverIds, setDragOverIds] = useState([]);
  const [dragStartIds, setDragStartIds] = useState([]);
  const chapter = children;
  const chapterAllIds = childrenAllidsorder;

  const changeOutdentInput = () => {
    if (currentIndent === "SUBHEADING") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("CHAPTER");
  };
  const changeIndentInput = () => {
    if (currentIndent === "CHAPTER") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("SUBHEADING");
  };

  const handleDragOverIds = (ids) => {
    setDragOverIds([...ids]);
  };
  const handleDragDropStartIds = (ids) => {
    setDragStartIds([...ids]);
  };
  const dragDropEndHandler = () => {
    if (dragOverIds.length !== dragStartIds.length) {

      alert("Parent element cannot be a chilren E.g Chapter cannot be Heading or Subheading.");
    } else {
      triggerDragDrop(dragStartIds, dragOverIds);
    }
  };
  const {
    handleIndent,
    handleOutdent,
    HandleChangeStandard,
    trashStandard,
    addStandard,
  } = getConsumer;

  // const setMarginLeft = (standardType) => {
  //   const UNITS = "em";
  //   if (standardType === "CHAPTER") return 0 + UNITS;
  //   else if (standardType === "HEADING") return 1 + UNITS;
  //   else if (standardType === "SUBHEADING") return 2 + UNITS;

  //   return "";
  // };

  const handleStandardSummit = (event) => {
    event.preventDefault();
    addStandard(currentIndent, newStandard);
    setNewStandard("");
  };
  return (
    <div className="Whole-curriculum">
      <div className="Head">
        <b>Mahematics</b>
      </div>
      <div className="AllSubjects">
        <div className="HeaderOfSubjects">
          <div className="twoheaders">
            <div className="main-heading">Actions</div>
            <div className="TwoSubHeaders">Move, Indent, Outdent, Delete </div>
          </div>
          <div className="twoheaders">
            <div className="main-heading">Standard</div>
            <div className="TwoSubHeaders">The text of the standard</div>
          </div>
        </div>
        <div className="subject-body">
          {chapterAllIds.map((chapterId) => {
            const { name } = chapter[chapterId];
            const heading = chapter[chapterId].children;
            const headingAllIds = chapter[chapterId].childrenAllidsorder;
            return (
              <div className="subject-box" key={chapterId}>
                <div className="subject-row">
                  <div
                    className="subject-col"
                    onDragOver={() => {
                      handleDragOverIds([chapterId]);
                    }}
                  >
                    <div className="SvgMarks">
                      <img
                        className="cursor-pointer"
                        src={Move}
                        alt="move"
                        onDragStart={() => {
                          handleDragDropStartIds([chapterId]);
                        }}
                        onDragEnd={() => {
                          dragDropEndHandler();
                        }}
                      />
                      <span className="tooltiptext">Move</span>
                    </div>
                    <div className="SvgMarks">
                      <img
                        className="cursor-pointer"
                        src={LeftArrow}
                        alt="left indent"
                        onClick={() => {
                          handleOutdent(chapterId);
                        }}
                      />
                      <span className="tooltiptext">Outdent</span>
                    </div>
                    <div className="SvgMarks">
                      <img
                        className="cursor-pointer"
                        src={RightArrow}
                        alt="right indent"
                        onClick={() => {
                          handleIndent(chapterId);
                        }}
                      />
                      <span className="tooltiptext">Indent</span>
                    </div>
                    <div className="SvgMarks">
                      <img
                        className="cursor-pointer"
                        src={Trash}
                        alt="dustbin"
                        onClick={() => {
                          trashStandard(chapterId);
                          setCurrentIndent("CHAPTER");
                        }}
                      />
                      <span className="tooltiptext">Delete</span>
                    </div>
                  </div>
                  <div className="subject-col">
                    <div
                      className="level"
                      // style={{ marginLeft: `${setMarginLeft("CHAPTER")}` }}
                    />
                  </div>
                  <div className="subject-col">
                    <input
                      className="chapter"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        HandleChangeStandard(event, chapterId)
                      }
                    />
                  </div>
                </div>
                <div className="heading-box">
                  {headingAllIds.map((headingId) => {
                    const { name } = heading[headingId];
                    const subHeadingAllIds =
                      heading[headingId].childrenAllidsorder;
                    const subHeading = heading[headingId].children;
                    return (
                      <React.Fragment key={headingId}>
                        <div className="heading-row" key={headingId}>
                          <div
                            className="heading-col"
                            onDragOver={() => {
                              handleDragOverIds([chapterId, headingId]);
                            }}
                          >
                            <div className="SvgMarks">
                              <img
                                className="cursor-pointer"
                                src={Move}
                                alt="move"
                                onDragStart={() => {
                                  handleDragDropStartIds([
                                    chapterId,
                                    headingId,
                                  ]);
                                }}
                                onDragEnd={() => {
                                  dragDropEndHandler();
                                }}
                              />
                              <span className="tooltiptext">Move</span>
                            </div>

                            <div className="SvgMarks">
                              <img
                                className="cursor-pointer"
                                src={LeftArrow}
                                alt="left arrow"
                                onClick={() => {
                                  handleOutdent(chapterId, headingId);
                                }}
                              />
                              <span className="tooltiptext">Outdent</span>
                            </div>
                            <div className="SvgMarks">
                              <img
                                className="cursor-pointer"
                                src={RightArrow}
                                alt="right arrow"
                                onClick={() => {
                                  handleIndent(chapterId, headingId);
                                }}
                              />
                              <span className="tooltiptext">Indent</span>
                            </div>
                            <div className="SvgMarks">
                              <img
                                className="cursor-pointer"
                                src={Trash}
                                alt="dustbin"
                                onClick={() => {
                                  trashStandard(chapterId, headingId);
                                  setCurrentIndent("HEADING");
                                }}
                              />
                              <span className="tooltiptext">Delete</span>
                            </div>
                          </div>
                          <div className="heading-col">
                            <div
                              className="level"
                              // style={{
                              //   marginLeft: `${setMarginLeft("HEADING")}`,
                              // }}
                            />
                          </div>
                          <div className="heading-col">
                            <input
                              className="heading"
                              type="text"
                              value={name}
                              onChange={(event) =>
                                HandleChangeStandard(
                                  event,
                                  chapterId,
                                  headingId
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="TwoSubHeaders-box">
                          {subHeadingAllIds &&
                            subHeadingAllIds.map((subHeadingId) => {
                              const { name } = subHeading[subHeadingId];
                              return (
                                <div
                                  className="TwoSubHeaders-row"
                                  key={subHeadingId}
                                >
                                  <div
                                    className="TwoSubHeaders-col"
                                    onDragOver={() => {
                                      handleDragOverIds([
                                        chapterId,
                                        headingId,
                                        subHeadingId,
                                      ]);
                                    }}
                                  >
                                    <div className="SvgMarks">
                                      <img
                                        className="cursor-pointer"
                                        src={Move}
                                        alt="move"
                                        onDragStart={() => {
                                          handleDragDropStartIds([
                                            chapterId,
                                            headingId,
                                            subHeadingId,
                                          ]);
                                        }}
                                        onDragEnd={() => {
                                          dragDropEndHandler();
                                        }}
                                      />
                                      <span className="tooltiptext">Move</span>
                                    </div>
                                    <div className="SvgMarks">
                                      <img
                                        className="cursor-pointer"
                                        src={LeftArrow}
                                        alt="left arrow"
                                        onClick={() => {
                                          handleOutdent(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          );
                                        }}
                                      />
                                      <span className="tooltiptext">
                                        Outdent
                                      </span>
                                    </div>
                                    <div className="SvgMarks">
                                      <img
                                        className="cursor-pointer"
                                        src={RightArrow}
                                        alt="right arrow"
                                        onClick={() =>
                                          handleIndent(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          )
                                        }
                                      />
                                      <span className="tooltiptext">
                                        Indent
                                      </span>
                                    </div>
                                    <div className="SvgMarks">
                                      <img
                                        className="cursor-pointer"
                                        src={Trash}
                                        alt="dustbin"
                                        onClick={() => {
                                          trashStandard(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          );
                                          setCurrentIndent("SUBHEADING");
                                        }}
                                      />
                                      <span className="tooltiptext">
                                        Delete
                                      </span>
                                    </div>
                                  </div>
                                  <div className="TwoSubHeaders-col">
                                    <div
                                      className="level"
                                      // style={{
                                      //   marginLeft: `${setMarginLeft(
                                      //     "SUBHEADING"
                                      //   )}`,
                                      // }}
                                    />
                                  </div>
                                  <div className="TwoSubHeaders-col">
                                    <input
                                      className="TwoSubHeaders"
                                      type="text"
                                      value={name}
                                      onChange={(event) =>
                                        HandleChangeStandard(
                                          event,
                                          chapterId,
                                          headingId,
                                          subHeadingId
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="enter-standard">
        <form onSubmit={handleStandardSummit}>
          <div className="standard-row">
            <div className="standard-col">
              <div className="SvgMarks">
                <img className="cursor-pointer" src={Move} alt="move" />
                <span className="tooltiptext">Move</span>
              </div>
              <div className="SvgMarks">
                <img
                  className="cursor-pointer"
                  src={LeftArrow}
                  alt="left arrow"
                  onClick={() => changeOutdentInput()}
                />
                <span className="tooltiptext">Outdent</span>
              </div>
              <div className="SvgMarks">
                <img
                  className="cursor-pointer"
                  src={RightArrow}
                  alt="right arrow"
                  onClick={() => changeIndentInput()}
                />
                <span className="tooltiptext">Indent</span>
              </div>
              <div className="SvgMarks">
                <img
                  className="cursor-pointer"
                  src={Trash}
                  alt="dustbin"
                  onClick={() => trashStandard()}
                />
                <span className="tooltiptext">Delete</span>
              </div>
            </div>
            <div className="standard-col">
              <div
                className="level"
                // style={{ marginLeft: `${setMarginLeft(currentIndent)}` }}
              />
            </div>
            <div className="standard-col">
              <input
                className={
                  currentIndent === "CHAPTER"
                    ? "chapter"
                    : currentIndent === "HEADING"
                    ? "heading"
                    : "TwoSubHeaders"
                }
                type="text"
                placeholder="Type Standard here E.G number"
                required
                autoFocus
                value={newStandard}
                onChange={(e) => setNewStandard(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="BtnStandard">
             &#10010; Add A Standard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
