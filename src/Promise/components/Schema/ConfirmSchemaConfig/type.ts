export interface UseAction {
  trigger: () => Promise<any | void>;
}
