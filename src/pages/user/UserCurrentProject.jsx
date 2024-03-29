import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TeamRole } from "../../store/constants/Role";
import { setCurrentMember, setTeam, useGetCurrentMemberQuery, useGetTeamQuery, useGetAllMembersDetailsQuery } from "../../store";
import { useGetAllProjectsQuery, useDeleteProjectsMutation, useGetProjectQuery, useUpdateProjectsMutation } from "../../store/apis/projectApi"
import { WEBLINKS } from "../../store/constants/WebLinks";
import { API_INSTANCE } from "../../store/apis/features/apisConst";
import CustomTableSortable from "../../components/table/CustomTableSortable";
import { Avatar, Box, Button, Card, Modal, Typography, LinearProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IoRemoveCircleSharp, IoPencil } from 'react-icons/io5';
import AddProjectButton from "./AddProjectButton";
import UpdateProject from "./UpdateProject";

export default function UserCurrentProject() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [projectId, setProjectId] = useState('');
    const [name, setName] = useState('');

    const {
        data: teamData,
        // isLoading: teamIsLoading,
        isSuccess: teamIsSuccess,
        isError: teamIsError,
        // error: teamError
    } = useGetTeamQuery(teamId);


    useEffect(() => {
        document.title = "Team"
        if (teamIsSuccess) {
            document.title = `Team ${teamData.teamName}`;
        }
    }, [teamIsSuccess, teamData]);

    const {
        data: getProjectData,
        isSuccess: getProjectIsSuccess,
        isLoading: getProjectIsLoading,
    } = useGetProjectQuery(projectId);

    const {
        data: currentMemberData,
        isSuccess: currentMemberIsSuccess,
        isLoading: currentMemberIsLoading,
    } = useGetCurrentMemberQuery(teamId);


    const {
        data: projectData,
        isLoading: projectIsLoading,
        isSuccess: projectIsSuccess,
        isError: projectIsError,
        error: projectError
    } = useGetAllProjectsQuery(teamId);

    const [remove, { isLoading }] = useDeleteProjectsMutation();



    useEffect(() => {
        if (teamIsError) {
            navigate(WEBLINKS.MAIN);
        } else if (teamIsSuccess) {
            dispatch(setTeam(teamData));
        }

        if (currentMemberIsSuccess) {
            dispatch(setCurrentMember(currentMemberData));
        }
    }, [dispatch, navigate, teamData, teamIsError, teamIsSuccess, currentMemberData, currentMemberIsSuccess]);

    const handleOpen = (id, projectName) => {
        setOpen(true);
        setProjectId(id);
        setName(projectName);
    }

    const handleRemove = async (projectId) => {
        try {
            const result = await remove(projectId);
            console.log(result);
            if (result?.error.originalStatus === 200) {
                setOpen(false);
                return;
            }
            console.log("Project cannot be removed");
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const config = [
        {
            id: 'projectId',
            label: 'Project Id',
            renderCell: (project) => project.id,
            sortValue: (project) => project.id,
        },
        {
            id: 'projectname',
            label: 'Project Name',
            renderCell: (project) => project.name,
            sortValue: (project) => project.name,
        },
        {
            id: 'addedAt',
            label: 'Created Date',
            renderCell: (project) => dayjs(project.addedAt).format("MMM. DD, YYYY"),
            sortValue: (project) => project.addedAt,
        },

        {
            id: 'remove',
            label: 'Remove',
            renderCell: (project) => {
                return <div>
                    <Button onClick={() => handleOpen(project.id, project.projectName)}
                        className="!rounded-full aspect-square !min-w-min hover:!bg-red-300"
                    >
                        <IoRemoveCircleSharp className="text-lg text-red-400" />
                    </Button>
                </div>
            }


        },

    ]

    let content2
    if (projectIsLoading) {
        content2 = <LinearProgress color="success" />;
    } else if (projectIsError) {
        console.log(projectError)
    } else if (projectIsSuccess) {
        const teamProjects = projectData.filter(project => project.team_id === teamId);
        content2 = (
            <Card>
                <AddProjectButton />
                <UpdateProject/>
                <CustomTableSortable data={teamProjects} config={config} />
            </Card>
        );
    }

    return (
        <div>
            {content2}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="remove-project-modal"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {projectId === getProjectIsLoading?.id ? (
                        <Typography id="remove-member-modal" variant="h6" className="text-center">
                            Do you want to remove this project?
                        </Typography>
                    ) : (
                        <div>
                            <Typography id="remove-member-modal" variant="h6" className="text-center">
                                Do you want to remove this project?
                            </Typography>
                        </div>
                    )}
                    <Box className="flex mt-5 items-center justify-between">
                        <LoadingButton
                            loading={isLoading}
                            onClick={() => handleRemove(projectId)}
                            variant="contained"
                            color="error"
                            className=""
                        >
                            {projectId === getProjectData?.id ? 'Yes' : 'Remove'}
                        </LoadingButton>
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )

}