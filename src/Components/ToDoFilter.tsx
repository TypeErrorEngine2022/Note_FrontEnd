import { useContext } from "react";
import { ItemContextType, ItemContext, Scope } from "../context/ItemContext";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export function ToDoFilter() {
  const { params, setParams } = useContext<ItemContextType>(ItemContext);
  const { t } = useTranslation();

  async function scopeFilter(scope: Scope) {
    if (scope === Scope.All) {
      setParams((prevParams) => ({
        ...prevParams,
        page: undefined,
        isCompleted: undefined,
      }));
    } else {
      setParams((prevParams) => ({
        ...prevParams,
        page: undefined,
        isCompleted: scope === Scope.Complete,
      }));
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
        {t("ALL")}
      </Button>
      <Button
        style={{
          borderColor: params.isCompleted === true ? "blue" : "gray",
        }}
        onClick={() => scopeFilter(Scope.Complete)}
      >
        {t("COMPLETE")}
      </Button>
      <Button
        style={{
          borderColor: params.isCompleted === false ? "blue" : "gray",
        }}
        onClick={() => scopeFilter(Scope.Incomplete)}
      >
        {t("INCOMPLETE")}
      </Button>
    </div>
  );
}
