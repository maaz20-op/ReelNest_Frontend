import { Virtuoso, VirtuosoGrid } from "react-virtuoso";

export const VirtualList = ({
  isGrid = false,
  data,
  itemRendered,
  mainContainerRef,
}) => {
  // Safe check: agar data nahi hai toh kuch render mat karo
  if (!Array.isArray(data) || data.length === 0) return null;

  return isGrid ? (
    <VirtuosoGrid
      customScrollParent={mainContainerRef?.current || undefined}
      data={data}
      // 1. Pehla argument hamesha index hota hai, doosra item
      itemContent={(index, item) => itemRendered(item, index)}
      components={{
        // 2. Yeh aapka main grid container banega
        List: ({ children, ...props }) => (
          <div
            {...props}
            className="p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {children}
          </div>
        ),
        // 3. Yeh har individual card ka wrapper banega
        Item: ({ children, ...props }) => (
          <div {...props} className="w-full">
            {children}
          </div>
        ),
      }}
    />
  ) : (
    <Virtuoso
      customScrollParent={mainContainerRef?.current || undefined}
      data={data}
      itemContent={(index, item) => itemRendered(item, index)}
    />
  );
};
