import { PropsWithChildren, useState } from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import Icon from "./Icon";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    refs: { setFloating, setReference },
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  return {
    context,
    getReferenceProps,
    getFloatingProps,
    isOpen,
    setFloating,
    setIsOpen,
    setReference,
  };
}

export default function Dialog({
  children,
  context,
  title,
  getFloatingProps,
  isOpen,
  setFloating,
  setIsOpen,
}: PropsWithChildren<
  { title: string } & Pick<
    ReturnType<typeof useDialog>,
    "context" | "getFloatingProps" | "isOpen" | "setFloating" | "setIsOpen"
  >
>) {
  const headingId = useId();
  const descriptionId = useId();
  return (
    <FloatingPortal>
      {isOpen && (
        <FloatingOverlay
          className="grid place-items-center bg-surface4"
          lockScroll
        >
          <FloatingFocusManager context={context}>
            <div
              className="relative z-0 m-16 min-w-440 rounded-24 bg-surface1 px-16 pb-40 pt-16 compact:box-border compact:w-[calc(100%-32px)] compact:min-w-0"
              ref={setFloating}
              aria-labelledby={headingId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
            >
              <h2
                className="text-center text-16 font-bold leading-16+4*2"
                id={headingId}
              >
                {title}
              </h2>
              <div>
                <button
                  className="absolute right-16 top-16 inline-grid"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name="close" size={24} />
                </button>
              </div>
              <div className="pt-16">{children}</div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
}
