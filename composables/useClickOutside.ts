export const useClickOutside = (
  component: Ref,
  callback: Function,
  excludeComponent: Ref
) => {
  // fail early if any of the required params is missing
  if (!component) {
    throw new Error('A target component has to be provided.')
  }

  if (!callback) {
    throw new Error('A callback has to be provided.')
  }
}
