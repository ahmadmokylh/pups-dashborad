import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

interface TotalCardType {
  title: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  total: number;
}

export function TotalCard({ title, name, icon, total }: TotalCardType) {
  const Icon = icon;
  return (
    <Item key={title} variant="outline" role="listitem">
      <ItemMedia variant="image">
        <Icon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{title}</ItemDescription>
      </ItemContent>
      <ItemContent className="flex-none text-center ">
        <ItemDescription className="text-2xl">{total}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
