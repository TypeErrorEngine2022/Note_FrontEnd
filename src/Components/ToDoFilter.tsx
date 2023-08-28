import { useContext } from "react";
import {
  ItemContextType,
  ItemContext,
  Scope,
  GetListParams,
} from "../context/ItemContext";
import { Button } from "antd";

export function ToDoFilter() {
  const { params, setParams } = useContext<ItemContextType>(ItemContext);

  async function scopeFilter(scope: Scope) {
    if (scope === Scope.All) {
      setParams(
        (prevParams) =>
          new GetListParams(
            undefined,
            prevParams.pageSize,
            prevParams.searchContent,
            undefined
          )
      );
    } else {
      setParams(
        (prevParams) =>
          new GetListParams(
            undefined,
            prevParams.pageSize,
            prevParams.searchContent,
            scope === Scope.Complete
          )
      );
    }
  }

  return (
    <div>
      <Button
        style={{
          borderColor: params.isCompleted == null ? "blue" : "gray",
        }}
        onClick={() => scopeFilter(Scope.All)}
      >
        All
      </Button>
      <Button
        style={{
          borderColor: params.isCompleted === true ? "blue" : "gray",
        }}
        onClick={() => scopeFilter(Scope.Complete)}
      >
        Complete
      </Button>
      <Button
        style={{
          borderColor: params.isCompleted === false ? "blue" : "gray",
        }}
        onClick={() => scopeFilter(Scope.Incomplete)}
      >
        Incomplete
      </Button>
    </div>
  );
}
