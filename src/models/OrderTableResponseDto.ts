export interface OrderTableResponseDto {
  tableName: string;
  roomName: string;
  items: OrderMenuItemResponseDto[];
}
export interface OrderMenuItemResponseDto {
  id: number;
  name: string;
  status: string;
  deliveredTime?: string | null;
  issuedDateTime?: string | null;
  inProgressDateTime?: string | null;
  readyDateTime?: string | null;
  menuName: string;
}
