import React, {useState, useEffect} from "react"
import userService from '../services/users'
import { Table, TableContainer, TableBody, TableRow, TableCell } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Users = ({users, setUsers}) => {

    return(
        <>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                                number of blogs created
                            </TableCell>
                        </TableRow>
                        {users.map(user => (
                            <TableRow key = {user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </TableCell>
                                <TableCell>
                                    {user.blogs.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Users