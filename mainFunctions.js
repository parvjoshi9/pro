import { store } from "./APIStore";
import React, { useState } from "react";
export const MyContext = React.createContext();

export default function ContextWrapper({ children }) {
  const [state, setState] = useState(store);

  const getJSONData = (data) => {
    setState({ ...data });
  };

  const triggerDragDrop = (dragIds, dropIds) => {
    const newState = state;
    if (dragIds.length === 1) {
      const getDragChapterIndex = newState.childrenAllidsorder.findIndex(
        (id) => id === dragIds[0]
      );

      const getDropChapterIndex = newState.childrenAllidsorder.findIndex(
        (id) => id === dropIds[0]
      );

      const swapId = newState.childrenAllidsorder.splice(
        getDragChapterIndex ,
        1
      );

      newState.childrenAllidsorder.splice(
        getDropChapterIndex ,
        0,
        ...swapId
      );
    } else if (dragIds.length === 2) {
      const getDraggedHeading =
        newState.children[dragIds[0]].children[dragIds[1]];

      delete newState.children[dragIds[0]].children[dragIds[1]];
      const findIndexOfDragHeading = newState.children[
        dragIds[0]
      ].childrenAllidsorder.findIndex((id) => id === dragIds[1]);
      newState.children[dragIds[0]].childrenAllidsorder.splice(
        findIndexOfDragHeading,
        1
      );

      const getDropElementHeadingIndex = newState.children[
        dropIds[0]
      ].childrenAllidsorder.findIndex((id) => id === dropIds[1]);
      newState.children[dropIds[0]].childrenAllidsorder.splice(
        getDropElementHeadingIndex,
        0,
        dragIds[1]
      );
      newState.children[dropIds[0]].children[dragIds[1]] = {
        ...getDraggedHeading,
      };
    } else if (dragIds.length === 3) {
      const getDraggedSubChild =
        newState.children[dragIds[0]].children[dragIds[1]].children[dragIds[2]];

      delete newState.children[dragIds[0]].children[dragIds[1]].children[
        dragIds[2]
      ];

      const findIndexOfDragSubheading = newState.children[dragIds[0]].children[
        dragIds[1]
      ].childrenAllidsorder.findIndex((id) => id === dragIds[2]);

      newState.children[dragIds[0]].children[
        dragIds[1]
      ].childrenAllidsorder.splice(findIndexOfDragSubheading, 1);

      const getDropElementSubheadingIndex = newState.children[
        dropIds[0]
      ].children[dropIds[1]].childrenAllidsorder.findIndex(
        (id) => id === dropIds[2]
      );

      newState.children[dropIds[0]].children[
        dropIds[1]
      ].childrenAllidsorder.splice(
        getDropElementSubheadingIndex,
        0,
        dragIds[2]
      );

      newState.children[dropIds[0]].children[dropIds[1]].children[
        dragIds[2]
      ] = {
        name: getDraggedSubChild.name,
      };
    }

    setState({ ...state });
  };

  const HandleChangeStandard = (event, chapterId, headingId, subheadingId) => {
    const newState = state;
    const { value } = event.target;

    if (chapterId && headingId && subheadingId) {
      newState.children[chapterId].children[headingId].children[
        subheadingId
      ].name = value;
    } else if (chapterId && headingId) {
      newState.children[chapterId].children[headingId].name = value;
    } else if (chapterId) {
      newState.children[chapterId].name = value;
    }

    setState({ ...newState });
  };

  const trashStandard = (chapterId, headingId, subheadingId) => {
    const newState = state;

    if (chapterId && headingId && subheadingId) {
      newState.children[chapterId].children[
        headingId
      ].childrenAllidsorder = newState.children[chapterId].children[
        headingId
      ].childrenAllidsorder.filter((id) => id !== subheadingId);
      delete newState.children[chapterId].children[headingId].children[
        subheadingId
      ];
    } else if (chapterId && headingId) {
      newState.children[chapterId].childrenAllidsorder = newState.children[
        chapterId
      ].childrenAllidsorder.filter((id) => id !== headingId);
      delete newState.children[chapterId].children[headingId];
    } else if (chapterId) {
      newState.childrenAllidsorder = newState.childrenAllidsorder.filter(
        (id) => id !== chapterId
      );
      delete newState.children[chapterId];
    }

    setState({ ...newState });
  };

  const addStandard = (currentStandard, newStandard) => {
    const newState = state;
    const newId = Math.random();
    if (currentStandard === "CHAPTER") {
      newState.childrenAllidsorder = [...newState.childrenAllidsorder, newId];
      newState.children[newId] = {
        name: newStandard,
        children: {},
        childrenAllidsorder: [],
      };
    } else if (currentStandard === "HEADING") {
      const getLastChapterId =
        newState.childrenAllidsorder[newState.childrenAllidsorder.length - 1];

      if (getLastChapterId) {
        newState.children[getLastChapterId].childrenAllidsorder = [
          ...newState.children[getLastChapterId].childrenAllidsorder,
          newId,
        ];
        newState.children[getLastChapterId].children[newId] = {
          name: newStandard,
          children: {},
          childrenAllidsorder: [],
        };

        setState({ ...newState });
      } else {
        alert("There Are no chapters. Please Add chapters.");
      }
    } else if (currentStandard === "SUBHEADING") {
      const getLastChapterId =
        newState.childrenAllidsorder[newState.childrenAllidsorder.length - 1];

      if (getLastChapterId) {
        const getLastHeadingId =
          newState.children[getLastChapterId].childrenAllidsorder[
            newState.children[getLastChapterId].childrenAllidsorder.length - 1
          ];

        if (getLastHeadingId) {
          const getLastHeadingChildren =
            newState.children[getLastChapterId].children[getLastHeadingId];

          getLastHeadingChildren.children[newId] = { name: newStandard };
          getLastHeadingChildren.childrenAllidsorder = [
            ...getLastHeadingChildren.childrenAllidsorder,
            newId,
          ];

          setState({ ...newState });
        } else {
          alert("The is no Heading in the Chapter.");
        }
      } else {
        alert("There is no Chapter.");
      }
    }
  };

  const handleIndent = (chapterId, headingId, subHeadingId) => {
    const newState = state;

    if (chapterId && headingId && subHeadingId) {
      alert("Maximum intend level reached.");
    } else if (chapterId && headingId) {
      const { children, childrenAllidsorder } = newState.children[chapterId];
      const { name } = children[headingId];

      const getPreviousHeadingOrder =
        childrenAllidsorder.findIndex((id) => id === headingId) - 1;

      if (getPreviousHeadingOrder === -1) {
        alert("Your Chapter is having no heading.");
      } else {
        const takeAllHeadingIds = children[
          headingId
        ].childrenAllidsorder.splice(
          0,
          children[headingId].childrenAllidsorder.length
        );

        const previousHeadId = childrenAllidsorder[getPreviousHeadingOrder];

        children[previousHeadId].children[headingId] = {
          name,
          children: {},
          childrenAllidsorder: [],
        };
        /*
         *   Merging the Children
         */

        children[previousHeadId].childrenAllidsorder = [
          ...children[previousHeadId].childrenAllidsorder,
          headingId,
          ...takeAllHeadingIds,
        ];

        for (const i of takeAllHeadingIds) {
          children[previousHeadId].children[i] = {
            name: children[headingId].children[i].name,
            children: {},
            childrenAllidsorder: [],
          };
        }
        delete children[headingId];

        const newchildrenAllidsorder = childrenAllidsorder.filter(
          (id) => id !== headingId
        );

        newState.children[
          chapterId
        ].childrenAllidsorder = newchildrenAllidsorder;

        setState({ ...state });
      }
    } else if (chapterId) {
      if (newState.childrenAllidsorder.length === 1) {
        alert("One Chapter cannot be Subhead.");
      } else {
        /**
         * Moving from chapter
         * to heading and making sub-heading
         * */
        const { name } = newState.children[chapterId];
        const { children, childrenAllidsorder } = newState;

        const getAllCurrentChapterId = children[chapterId].childrenAllidsorder;
        const getBeforeChapterIndex =
          childrenAllidsorder.findIndex((id) => id === chapterId) - 1;
        const getBeforeChapterId = childrenAllidsorder[getBeforeChapterIndex];

        children[getBeforeChapterId].children[chapterId] = {
          name,
          childrenAllidsorder: [],
          children: {},
        };

        children[getBeforeChapterId].childrenAllidsorder = [
          ...children[getBeforeChapterId].childrenAllidsorder,
          chapterId,
        ];

        for (const i of getAllCurrentChapterId) {
          children[getBeforeChapterId].childrenAllidsorder = [
            ...children[getBeforeChapterId].childrenAllidsorder,
            i,
          ];
          const childNamesOfHeading = children[chapterId].children[i].name;
          children[getBeforeChapterId].children[i] = {
            name: childNamesOfHeading,
            children: {},
            childrenAllidsorder: [],
          };
        }

        const newchildrenAllidsorder = childrenAllidsorder.filter(
          (id) => id !== chapterId
        );
        newState.childrenAllidsorder = newchildrenAllidsorder;
        delete newState.children[chapterId];

        setState({ ...newState });
      }
    }
  };
  const handleOutdent = (chapterId, headingId, subHeadingId) => {
    const newState = state;
    if (chapterId && headingId && subHeadingId) {
      const { children, childrenAllidsorder } = newState.children[chapterId];
      const { name } = newState.children[chapterId].children[
        headingId
      ].children[subHeadingId];

      const findSubheadingIndex = children[
        headingId
      ].childrenAllidsorder.findIndex((id) => id === subHeadingId);

      const extractRemainingSubHeadingIds = children[
        headingId
      ].childrenAllidsorder.splice(
        findSubheadingIndex + 1,
        children[headingId].childrenAllidsorder.length
      );

      children[subHeadingId] = {
        children: {},
        childrenAllidsorder: extractRemainingSubHeadingIds,
      };

      const subHeadingChildren = children[headingId].children;

      children[subHeadingId].name = name;
      for (const i of extractRemainingSubHeadingIds) {
        children[subHeadingId].children[i] = {
          name: subHeadingChildren[i].name,
        };
      }

      ///REMOVING ALL ID OF SUBHEADING
      for (const i of children[subHeadingId].childrenAllidsorder) {
        delete children[headingId].children[i];
      }
      delete children[headingId].children[subHeadingId];
      const findSubheadingIndexDelete = children[
        headingId
      ].childrenAllidsorder.findIndex((id) => id === subHeadingId);

      children[headingId].childrenAllidsorder.splice(
        findSubheadingIndexDelete,
        1
      );

      const getHeadingIndex = childrenAllidsorder.findIndex(
        (id) => id === headingId
      );
      childrenAllidsorder.splice(getHeadingIndex + 1, 0, subHeadingId);

      setState({ ...newState });
    } else if (chapterId && headingId) {
      /* from heading
       * to chapter
       */
      const { children, childrenAllidsorder } = newState;
      const { name } = children[chapterId].children[headingId];
      const findHeadingIndex = children[
        chapterId
      ].childrenAllidsorder.findIndex((id) => id === headingId);

      if (
        children[chapterId].children[headingId].childrenAllidsorder.length !== 0
      ) {
        alert("You have Sub-heading to settle.");
      } else if (findHeadingIndex + 1) {
        const slicingChildren = children[chapterId].childrenAllidsorder.slice(
          findHeadingIndex,
          children[chapterId].childrenAllidsorder.length
        );

        slicingChildren.shift();

        children[headingId] = {
          name,
          children: {},
          childrenAllidsorder: slicingChildren,
        };

        for (const i of slicingChildren) {
          children[headingId].children[i] = {
            name: children[chapterId].children[i].name,
            children: {},
            childrenAllidsorder: [],
          };
        }

        children[chapterId].childrenAllidsorder = children[
          chapterId
        ].childrenAllidsorder.slice(0, findHeadingIndex);

        for (const i of slicingChildren) {
          delete children[chapterId].children[i];
        }
        delete children[chapterId].children[headingId];

        const getChapterIndex = childrenAllidsorder.findIndex(
          (id) => id === chapterId
        );
        newState.childrenAllidsorder.splice(getChapterIndex + 1, 0, headingId);

        setState({ ...newState });
      } else {
        alert("No heading but sub headings are there.");
      }
    } else if (chapterId) {
      alert("Maximum outdent level reached.");
    }
  };

  return (
    <MyContext.Provider
      value={{
        state: state,
        handleIndent,
        handleOutdent,
        HandleChangeStandard,
        trashStandard,
        addStandard,
        getJSONData,
        triggerDragDrop,
      }}
    >
      <div className="App">{children}</div>
    </MyContext.Provider>
  );
}
