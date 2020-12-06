import { gql } from 'apollo-boost';

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Boolean!
    }
`;

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, _context, _info) => {
            const data = _context.cache.readQuery({
                query: GET_CART_HIDDEN,
                variables: {}
            })

            const actualCartHidden = data.cartHidden;
            _context.cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !actualCartHidden }
            })

            return !actualCartHidden;
        }
    }
}